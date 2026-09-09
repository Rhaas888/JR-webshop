import { ervaringenPage } from "@/lib/content";
import { formatNlRelative } from "@/lib/reviews";
import { StarRow } from "@/components/reviews/star-row";

export type ReviewCardData = {
  _id: string;
  name: string;
  role?: string;
  company?: string;
  initials: string;
  rating: number;
  text: string;
  createdAt: number;
  topic?: "webshop" | "app" | "onderhoud";
};

export function GoogleStyleCard({ review }: { review: ReviewCardData }) {
  const meta = [review.role, review.company].filter(Boolean).join(" · ");

  return (
    <article className="flex h-full flex-col rounded-3xl border border-black/8 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <StarRow rating={review.rating} />
        <span className="rounded-full bg-forest-soft px-2.5 py-1 text-[11px] font-medium tracking-wide text-forest">
          {ervaringenPage.badge}
        </span>
      </div>
      <p className="mt-4 flex-1 text-base font-medium leading-7 text-foreground">
        “{review.text}”
      </p>
      <div className="mt-6 flex items-center gap-3">
        <span
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-forest text-sm font-semibold text-white"
          aria-hidden="true"
        >
          {review.initials}
        </span>
        <div>
          <p className="text-sm font-semibold tracking-tight">{review.name}</p>
          <p className="text-sm text-muted-foreground">
            {meta ? `${meta} · ` : null}
            {formatNlRelative(review.createdAt)}
          </p>
        </div>
      </div>
    </article>
  );
}
