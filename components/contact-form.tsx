"use client";

import { useMutation } from "convex/react";
import { useState, type FormEvent, type ReactNode } from "react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { company } from "@/lib/content";

type Interest = "webshop" | "app" | "anders";

type LeadPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  interest: Interest;
  message: string;
  website?: string;
};

export function ContactForm({
  defaultInterest = "webshop",
}: {
  defaultInterest?: Interest;
}) {
  const convexReady = Boolean(process.env.NEXT_PUBLIC_CONVEX_URL);

  if (convexReady) {
    return <ConvexContactForm defaultInterest={defaultInterest} />;
  }

  return <MailtoContactForm defaultInterest={defaultInterest} />;
}

function ConvexContactForm({ defaultInterest }: { defaultInterest: Interest }) {
  const submitLead = useMutation(api.leads.submit);
  return (
    <ContactFormFields
      defaultInterest={defaultInterest}
      onSend={async (payload) => {
        await submitLead(payload);
      }}
    />
  );
}

function MailtoContactForm({ defaultInterest }: { defaultInterest: Interest }) {
  return (
    <ContactFormFields
      defaultInterest={defaultInterest}
      onSend={async (payload) => {
        const subject = encodeURIComponent(
          `Offerte ${payload.interest} — ${payload.name}`,
        );
        const body = encodeURIComponent(
          [
            `Naam: ${payload.name}`,
            `E-mail: ${payload.email}`,
            payload.phone ? `Telefoon: ${payload.phone}` : null,
            payload.company ? `Bedrijf: ${payload.company}` : null,
            `Interesse: ${payload.interest}`,
            "",
            payload.message,
          ]
            .filter(Boolean)
            .join("\n"),
        );
        window.open(`mailto:${company.email}?subject=${subject}&body=${body}`);
      }}
    />
  );
}

function ContactFormFields({
  defaultInterest,
  onSend,
}: {
  defaultInterest: Interest;
  onSend: (payload: LeadPayload) => Promise<void>;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);
  const [interest, setInterest] = useState<Interest>(defaultInterest);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setError(null);

    const payload: LeadPayload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? "") || undefined,
      company: String(data.get("company") ?? "") || undefined,
      interest,
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? "") || undefined,
    };

    try {
      await onSend(payload);
      setStatus("sent");
      form.reset();
      setInterest(defaultInterest);
    } catch (unknownError) {
      setStatus("error");
      setError(
        unknownError instanceof Error
          ? unknownError.message
          : "Verzenden is niet gelukt. Probeer het opnieuw.",
      );
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-black/8 bg-white p-8">
        <h3 className="text-xl font-semibold tracking-tight">Bericht ontvangen</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Bedankt. We reageren binnen 1 werkdag op het opgegeven e-mailadres.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-black/8 bg-white p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Naam" htmlFor="name">
          <Input id="name" name="name" required autoComplete="name" className="h-11" />
        </Field>
        <Field label="E-mail" htmlFor="email">
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="h-11"
          />
        </Field>
        <Field label="Telefoon" htmlFor="phone" optional>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" className="h-11" />
        </Field>
        <Field label="Bedrijf" htmlFor="company" optional>
          <Input id="company" name="company" autoComplete="organization" className="h-11" />
        </Field>
      </div>

      <div className="mt-5">
        <Label htmlFor="interest" className="mb-2">
          Interesse
        </Label>
        <select
          id="interest"
          value={interest}
          onChange={(event) => setInterest(event.target.value as Interest)}
          className="h-11 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="webshop">Webshop laten bouwen</option>
          <option value="app">App laten maken</option>
          <option value="anders">Iets anders</option>
        </select>
      </div>

      <div className="mt-5">
        <Label htmlFor="message" className="mb-2">
          Bericht
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={6}
          placeholder="Wat wil je laten bouwen?"
          className="min-h-32"
        />
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {error ? (
        <p className="mt-4 text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 h-11 w-full px-5 text-sm sm:w-auto"
      >
        {status === "sending" ? "Versturen…" : "Versturen"}
      </Button>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        We gebruiken je gegevens alleen om te reageren. Zie onze{" "}
        <a href="/privacy" className="underline">
          privacyverklaring
        </a>
        .
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={htmlFor} className="mb-2">
        {label}
        {optional ? (
          <span className="font-normal text-muted-foreground"> (optioneel)</span>
        ) : null}
      </Label>
      {children}
    </div>
  );
}
