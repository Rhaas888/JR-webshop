"use client";

import { useMutation } from "convex/react";
import { useState, type FormEvent } from "react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { company } from "@/lib/content";
import type { ReviewTopic } from "@/lib/reviews";

export function ReviewForm() {
  if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    return (
      <div className="rounded-3xl border border-black/8 bg-forest-soft/60 p-6 sm:p-8">
        <h3 className="text-xl font-semibold tracking-tight">Schrijf een review</h3>
        <p className="mt-3 text-base font-medium leading-7 text-foreground">
          Mail je ervaring naar{" "}
          <a className="underline" href={`mailto:${company.email}`}>
            {company.email}
          </a>
          . We plaatsen hem na een korte check.
        </p>
      </div>
    );
  }

  return <ConvexReviewForm />;
}

function ConvexReviewForm() {
  const submit = useMutation(api.reviews.submit);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [topic, setTopic] = useState<ReviewTopic>("webshop");
  const [rating, setRating] = useState(5);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError(null);

    try {
      await submit({
        name: String(data.get("name") ?? ""),
        role: String(data.get("role") ?? "") || undefined,
        company: String(data.get("company") ?? "") || undefined,
        rating,
        text: String(data.get("text") ?? ""),
        topic,
        website: String(data.get("website") ?? "") || undefined,
      });
      setStatus("sent");
      form.reset();
      setTopic("webshop");
      setRating(5);
    } catch (unknownError) {
      setStatus("error");
      setError(
        unknownError instanceof Error
          ? unknownError.message
          : "Verzenden is niet gelukt.",
      );
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-3xl border border-black/8 bg-white p-8">
        <h3 className="text-xl font-semibold tracking-tight">Review ontvangen</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Dank je. We lezen hem na en plaatsen hem als hij klopt. Geen automatische publicatie.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-black/8 bg-white p-6 sm:p-8"
    >
      <h3 className="text-xl font-semibold tracking-tight">Schrijf een review</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        We plaatsen reviews pas na een check. Geen Google-account nodig.
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="review-name" className="mb-2">
            Naam
          </Label>
          <Input id="review-name" name="name" required className="h-11" />
        </div>
        <div>
          <Label htmlFor="review-company" className="mb-2">
            Bedrijf <span className="font-normal text-muted-foreground">(optioneel)</span>
          </Label>
          <Input id="review-company" name="company" className="h-11" />
        </div>
      </div>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="review-topic" className="mb-2">
            Over
          </Label>
          <select
            id="review-topic"
            value={topic}
            onChange={(event) => setTopic(event.target.value as ReviewTopic)}
            className="h-11 w-full rounded-2xl border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="webshop">Webshop</option>
            <option value="app">App</option>
            <option value="onderhoud">Onderhoud</option>
          </select>
        </div>
        <div>
          <Label htmlFor="review-rating" className="mb-2">
            Score
          </Label>
          <select
            id="review-rating"
            value={rating}
            onChange={(event) => setRating(Number(event.target.value))}
            className="h-11 w-full rounded-2xl border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value={5}>5 sterren</option>
            <option value={4}>4 sterren</option>
            <option value={3}>3 sterren</option>
            <option value={2}>2 sterren</option>
            <option value={1}>1 ster</option>
          </select>
        </div>
      </div>
      <div className="mt-5">
        <Label htmlFor="review-text" className="mb-2">
          Je ervaring
        </Label>
        <Textarea
          id="review-text"
          name="text"
          required
          minLength={20}
          rows={5}
          placeholder="Wat ging er goed, wat kan beter?"
        />
      </div>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="review-website">Website</label>
        <input id="review-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {error ? (
        <p className="mt-4 text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={status === "sending"} className="mt-6 h-11 rounded-2xl px-5">
        {status === "sending" ? "Versturen…" : "Review versturen"}
      </Button>
    </form>
  );
}
