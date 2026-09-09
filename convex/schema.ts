import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const interest = v.union(
  v.literal("webshop"),
  v.literal("app"),
  v.literal("onderhoud"),
  v.literal("anders"),
);

const reviewTopic = v.union(
  v.literal("webshop"),
  v.literal("app"),
  v.literal("onderhoud"),
);

export default defineSchema({
  leads: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    interest,
    message: v.string(),
    budget: v.optional(v.string()),
    timeline: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),

  reviews: defineTable({
    name: v.string(),
    role: v.optional(v.string()),
    company: v.optional(v.string()),
    initials: v.string(),
    rating: v.number(),
    text: v.string(),
    topic: reviewTopic,
    source: v.literal("jr"),
    published: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_published_and_createdAt", ["published", "createdAt"])
    .index("by_published_and_topic", ["published", "topic"]),
});
