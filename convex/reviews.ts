import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { seededReviews } from "./reviewData";

const topicValidator = v.union(
  v.literal("webshop"),
  v.literal("app"),
  v.literal("onderhoud"),
);

const publicReview = v.object({
  _id: v.string(),
  name: v.string(),
  role: v.optional(v.string()),
  company: v.optional(v.string()),
  initials: v.string(),
  rating: v.number(),
  text: v.string(),
  topic: topicValidator,
  createdAt: v.number(),
});

export const list = query({
  args: {
    topic: v.optional(topicValidator),
  },
  returns: v.array(publicReview),
  handler: async (ctx, args) => {
    const topic = args.topic;
    const rows = topic
      ? await ctx.db
          .query("reviews")
          .withIndex("by_published_and_topic", (q) =>
            q.eq("published", true).eq("topic", topic),
          )
          .order("desc")
          .take(40)
      : await ctx.db
          .query("reviews")
          .withIndex("by_published_and_createdAt", (q) =>
            q.eq("published", true),
          )
          .order("desc")
          .take(40);

    return rows.map((row) => ({
      _id: row._id,
      name: row.name,
      role: row.role,
      company: row.company,
      initials: row.initials,
      rating: row.rating,
      text: row.text,
      topic: row.topic,
      createdAt: row.createdAt,
    }));
  },
});

export const submit = mutation({
  args: {
    name: v.string(),
    role: v.optional(v.string()),
    company: v.optional(v.string()),
    rating: v.number(),
    text: v.string(),
    topic: topicValidator,
    website: v.optional(v.string()),
  },
  returns: v.object({ ok: v.literal(true) }),
  handler: async (ctx, args) => {
    if (args.website && args.website.trim().length > 0) {
      return { ok: true as const };
    }

    const name = args.name.trim();
    const role = args.role?.trim();
    const companyName = args.company?.trim();
    const text = args.text.trim();
    const rating = Math.round(args.rating);

    if (name.length < 2 || name.length > 80) {
      throw new Error("Vul een geldige naam in (2 tot 80 tekens).");
    }

    if (rating < 1 || rating > 5) {
      throw new Error("Kies een score van 1 tot 5 sterren.");
    }

    if (text.length < 20 || text.length > 800) {
      throw new Error("Je review moet tussen 20 en 800 tekens zijn.");
    }

    if (role && role.length > 60) {
      throw new Error("Functie is te lang.");
    }

    if (companyName && companyName.length > 80) {
      throw new Error("Bedrijfsnaam is te lang.");
    }

    const initials = name
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => (part.charAt(0) ? part.charAt(0).toUpperCase() : ""))
      .join("");

    await ctx.db.insert("reviews", {
      name,
      role: role && role.length > 0 ? role : undefined,
      company: companyName && companyName.length > 0 ? companyName : undefined,
      initials: initials || "JR",
      rating,
      text,
      topic: args.topic,
      source: "jr",
      published: false,
      createdAt: Date.now(),
    });

    return { ok: true as const };
  },
});

export const seedIfEmpty = internalMutation({
  args: {},
  returns: v.object({ inserted: v.number() }),
  handler: async (ctx) => {
    const existing = await ctx.db
      .query("reviews")
      .withIndex("by_published_and_createdAt", (q) => q.eq("published", true))
      .take(1);

    if (existing.length > 0) {
      return { inserted: 0 };
    }

    const now = Date.now();
    let inserted = 0;

    for (const review of seededReviews) {
      const initials = review.initials;
      await ctx.db.insert("reviews", {
        name: review.name,
        role: review.role,
        company: review.company,
        initials,
        rating: review.rating,
        text: review.text,
        topic: review.topic,
        source: "jr",
        published: true,
        createdAt: now - review.daysAgo * 24 * 60 * 60 * 1000,
      });
      inserted += 1;
    }

    return { inserted };
  },
});
