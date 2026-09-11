"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { GoogleStyleCard, type ReviewCardData } from "@/components/reviews/google-style-card";
import { StarRow } from "@/components/reviews/star-row";
import { ReviewForm } from "@/components/reviews/review-form";
import { Section, SectionHeading } from "@/components/section";
import { ervaringenPage } from "@/lib/content";
import {
  averageRating,
  filterReviews,
  seededPublicReviews,
  type ReviewTopic,
} from "@/lib/reviews";
import { hoverBtn } from "@/lib/ui";
import { cn } from "@/lib/utils";

const filters: { id: "all" | ReviewTopic; label: string }[] = [
  { id: "all", label: "Alle" },
  { id: "webshop", label: "Webshop" },
  { id: "app", label: "App" },
  { id: "onderhoud", label: "Onderhoud" },
];

export function ReviewsBoard({
  showForm = false,
  limit,
}: {
  showForm?: boolean;
  limit?: number;
}) {
  if (process.env.NEXT_PUBLIC_CONVEX_URL) {
    return <ConvexReviewsBoard showForm={showForm} limit={limit} />;
  }
  return <StaticReviewsBoard showForm={showForm} limit={limit} />;
}

function ConvexReviewsBoard({
  showForm,
  limit,
}: {
  showForm: boolean;
  limit?: number;
}) {
  const remote = useQuery(api.reviews.list, {});
  const reviews = remote && remote.length > 0 ? remote : seededPublicReviews();
  const loading = remote === undefined;
  return (
    <ReviewsBoardView
      reviews={reviews}
      loading={loading}
      showForm={showForm}
      limit={limit}
    />
  );
}

function StaticReviewsBoard({
  showForm,
  limit,
}: {
  showForm: boolean;
  limit?: number;
}) {
  return (
    <ReviewsBoardView
      reviews={seededPublicReviews()}
      loading={false}
      showForm={showForm}
      limit={limit}
    />
  );
}

function ReviewsBoardView({
  reviews,
  loading,
  showForm,
  limit,
}: {
  reviews: ReviewCardData[];
  loading: boolean;
  showForm: boolean;
  limit?: number;
}) {
  const [filter, setFilter] = useState<"all" | ReviewTopic>("all");
  const topic = filter === "all" ? undefined : filter;
  const filtered = useMemo(() => {
    const next = filterReviews(
      reviews.filter((review): review is ReviewCardData & { topic: ReviewTopic } =>
        Boolean(review.topic),
      ),
      topic,
    );
    return typeof limit === "number" ? next.slice(0, limit) : next;
  }, [reviews, topic, limit]);
  const average = averageRating(reviews);

  return (
    <div>
      <div className="rounded-[2rem] border border-black/8 bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-wide text-forest">
              {ervaringenPage.badge}
            </p>
            <div className="mt-3 flex items-end gap-3">
              <p className="text-5xl font-semibold tracking-tight">{average.toFixed(1)}</p>
              <div className="pb-1">
                <StarRow rating={average} size="lg" />
                <p className="mt-1 text-sm text-muted-foreground">
                  {reviews.length} reviews
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={cn(
                  "h-10 rounded-full px-4 text-sm font-medium",
                  hoverBtn,
                  filter === item.id
                    ? "bg-forest text-white hover:bg-forest"
                    : "bg-forest-soft text-forest hover:bg-[#dce6df]",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <p className="mt-8 text-sm text-muted-foreground">Reviews laden…</p>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {filtered.map((review) => (
            <GoogleStyleCard key={review._id} review={review} />
          ))}
        </div>
      )}

      {showForm ? (
        <div className="mt-12">
          <ReviewForm />
        </div>
      ) : null}
    </div>
  );
}

export function ReviewsTeaser() {
  return (
    <Section>
      <SectionHeading
        kicker="Ervaringen"
        title="Wat klanten zeggen"
        description="Geen Google-widget. Reviews via ons. Lees ze allemaal, of schrijf er zelf een."
      />
      <div className="mt-10">
        <ReviewsBoard limit={4} />
      </div>
      <Link
        href="/ervaringen"
        className="mt-8 inline-flex text-sm font-medium text-forest underline underline-offset-4 transition-colors hover:text-foreground"
      >
        Alle ervaringen
      </Link>
    </Section>
  );
}
