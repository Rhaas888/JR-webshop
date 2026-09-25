"use client";

import { useMutation } from "convex/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, type FormEvent, type ReactNode } from "react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  budgetOptions,
  company,
  interestOptions,
  timelineOptions,
  type Interest,
} from "@/lib/content";
import {
  getPricingCatalog,
  isPricingDienst,
} from "@/lib/pricing";

type LeadPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  interest: Interest;
  message: string;
  budget?: string;
  timeline?: string;
  website?: string;
};

function isInterest(value: string | null): value is Interest {
  return interestOptions.some((option) => option.value === value);
}

function matchPackageId(interest: Interest, raw: string) {
  if (!raw || !isPricingDienst(interest)) return "";
  const needle = raw.toLowerCase();
  const found = getPricingCatalog(interest).packages.find(
    (item) => item.id === needle || item.name.toLowerCase() === needle,
  );
  return found?.id ?? "";
}

export function ContactForm({
  defaultInterest = "webshop",
  variant = "contact",
}: {
  defaultInterest?: Interest;
  variant?: "contact" | "offerte";
}) {
  return (
    <Suspense fallback={<div className="min-h-[28rem] rounded-3xl border border-black/8 bg-white" />}>
      <ContactFormReady defaultInterest={defaultInterest} variant={variant} />
    </Suspense>
  );
}

function ContactFormReady({
  defaultInterest,
  variant,
}: {
  defaultInterest: Interest;
  variant: "contact" | "offerte";
}) {
  const convexReady = Boolean(process.env.NEXT_PUBLIC_CONVEX_URL);

  if (convexReady) {
    return <ConvexContactForm defaultInterest={defaultInterest} variant={variant} />;
  }

  return <MailtoContactForm defaultInterest={defaultInterest} variant={variant} />;
}

function ConvexContactForm({
  defaultInterest,
  variant,
}: {
  defaultInterest: Interest;
  variant: "contact" | "offerte";
}) {
  const submitLead = useMutation(api.leads.submit);
  return (
    <ContactFormFields
      defaultInterest={defaultInterest}
      variant={variant}
      onSend={async (payload) => {
        await submitLead(payload);
      }}
    />
  );
}

function MailtoContactForm({
  defaultInterest,
  variant,
}: {
  defaultInterest: Interest;
  variant: "contact" | "offerte";
}) {
  return (
    <ContactFormFields
      defaultInterest={defaultInterest}
      variant={variant}
      onSend={async (payload) => {
        const subject = encodeURIComponent(
          `${variant === "offerte" ? "Offerte" : "Contact"} ${payload.interest}: ${payload.name}`,
        );
        const body = encodeURIComponent(
          [
            `Naam: ${payload.name}`,
            `E-mail: ${payload.email}`,
            payload.phone ? `Telefoon: ${payload.phone}` : null,
            payload.company ? `Bedrijf: ${payload.company}` : null,
            `Interesse: ${payload.interest}`,
            payload.budget ? `Budget: ${payload.budget}` : null,
            payload.timeline ? `Planning: ${payload.timeline}` : null,
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
  variant,
  onSend,
}: {
  defaultInterest: Interest;
  variant: "contact" | "offerte";
  onSend: (payload: LeadPayload) => Promise<void>;
}) {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const queryInterest = searchParams.get("interesse");
  const queryPackage = searchParams.get("pakket") ?? "";
  const [interest, setInterest] = useState<Interest>(
    isInterest(queryInterest) ? queryInterest : defaultInterest,
  );
  const [pakket, setPakket] = useState(() =>
    matchPackageId(isInterest(queryInterest) ? queryInterest : defaultInterest, queryPackage),
  );
  const packageOptions = isPricingDienst(interest)
    ? getPricingCatalog(interest).packages
    : [];

  useEffect(() => {
    const nextInterest = isInterest(queryInterest) ? queryInterest : defaultInterest;
    setInterest(nextInterest);
    setPakket(matchPackageId(nextInterest, queryPackage));
  }, [defaultInterest, queryInterest, queryPackage]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setError(null);

    const chosenPackage = String(data.get("pakket") ?? "");
    const pack = packageOptions.find((item) => item.id === chosenPackage);
    const extraLines = [
      pack ? `Pakket: ${pack.name} (${pack.price})` : chosenPackage ? `Pakket: ${chosenPackage}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const message = [String(data.get("message") ?? ""), extraLines]
      .filter(Boolean)
      .join("\n\n");

    const payload: LeadPayload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? "") || undefined,
      company: String(data.get("company") ?? "") || undefined,
      interest,
      message,
      budget: String(data.get("budget") ?? "") || undefined,
      timeline: String(data.get("timeline") ?? "") || undefined,
      website: String(data.get("website") ?? "") || undefined,
    };

    try {
      await onSend(payload);
      setStatus("sent");
      form.reset();
      setInterest(defaultInterest);
      setPakket("");
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
      <div className="rounded-3xl border border-black/8 bg-white p-8">
        <h3 className="text-xl font-semibold tracking-tight">Bericht ontvangen</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Bedankt. We reageren binnen 1 werkdag op het opgegeven e-mailadres.
        </p>
      </div>
    );
  }

  return (
    <form
      id={variant === "offerte" ? "offerte-form" : undefined}
      onSubmit={onSubmit}
      className="scroll-mt-24 rounded-3xl border border-black/8 bg-white p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Naam" htmlFor="name">
          <Input id="name" name="name" required autoComplete="name" className="h-11 rounded-2xl" />
        </Field>
        <Field label="E-mail" htmlFor="email">
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="h-11 rounded-2xl"
          />
        </Field>
        <Field label="Telefoon" htmlFor="phone" optional>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" className="h-11 rounded-2xl" />
        </Field>
        <Field label="Bedrijf" htmlFor="company" optional>
          <Input id="company" name="company" autoComplete="organization" className="h-11 rounded-2xl" />
        </Field>
      </div>

      <div className="mt-5">
        <Label htmlFor="interest" className="mb-2">
          Interesse
        </Label>
        <select
          id="interest"
          value={interest}
          onChange={(event) => {
            const next = event.target.value as Interest;
            setInterest(next);
            setPakket("");
          }}
          className="h-11 w-full rounded-2xl border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {interestOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {variant === "offerte" && packageOptions.length > 0 ? (
        <div className="mt-5">
          <Label htmlFor="pakket" className="mb-2">
            Pakket
          </Label>
          <select
            id="pakket"
            name="pakket"
            value={pakket}
            onChange={(event) => setPakket(event.target.value)}
            className="h-11 w-full rounded-2xl border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="">Nog niet gekozen</option>
            {packageOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name} ({option.price})
              </option>
            ))}
          </select>
        </div>
      ) : null}

      {variant === "offerte" ? (
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="budget" className="mb-2">
              Budget
            </Label>
            <select
              id="budget"
              name="budget"
              defaultValue="Nog niet bekend"
              className="h-11 w-full rounded-2xl border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {budgetOptions.map((option) => (
                <option key={option.value} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="timeline" className="mb-2">
              Planning
            </Label>
            <select
              id="timeline"
              name="timeline"
              defaultValue="Nog niet bekend"
              className="h-11 w-full rounded-2xl border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {timelineOptions.map((option) => (
                <option key={option.value} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : null}

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
          placeholder={
            variant === "offerte"
              ? "Wat wil je laten bouwen, en voor wie?"
              : "Waar kunnen we je mee helpen?"
          }
          className="min-h-32 rounded-2xl"
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
        className="mt-6 h-11 w-full rounded-2xl px-5 text-sm sm:w-auto"
      >
        {status === "sending"
          ? "Versturen…"
          : variant === "offerte"
            ? "Offerte aanvragen"
            : "Versturen"}
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
