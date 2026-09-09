import { mutation } from "./_generated/server";
import { v } from "convex/values";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const interestValidator = v.union(
  v.literal("webshop"),
  v.literal("app"),
  v.literal("anders"),
);

export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    interest: interestValidator,
    message: v.string(),
    website: v.optional(v.string()),
  },
  returns: v.object({ ok: v.literal(true) }),
  handler: async (ctx, args) => {
    if (args.website && args.website.trim().length > 0) {
      return { ok: true as const };
    }

    const name = args.name.trim();
    const email = args.email.trim().toLowerCase();
    const message = args.message.trim();
    const phone = args.phone?.trim();
    const companyName = args.company?.trim();

    if (name.length < 2 || name.length > 80) {
      throw new Error("Vul een geldige naam in (2 tot 80 tekens).");
    }

    if (!EMAIL_PATTERN.test(email) || email.length > 120) {
      throw new Error("Vul een geldig e-mailadres in.");
    }

    if (message.length < 10 || message.length > 2000) {
      throw new Error("Je bericht moet tussen 10 en 2000 tekens zijn.");
    }

    if (phone && phone.length > 40) {
      throw new Error("Telefoonnummer is te lang.");
    }

    if (companyName && companyName.length > 120) {
      throw new Error("Bedrijfsnaam is te lang.");
    }

    await ctx.db.insert("leads", {
      name,
      email,
      phone: phone && phone.length > 0 ? phone : undefined,
      company: companyName && companyName.length > 0 ? companyName : undefined,
      interest: args.interest,
      message,
      createdAt: Date.now(),
    });

    return { ok: true as const };
  },
});
