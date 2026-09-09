import { cn } from "@/lib/utils";

export function StarRow({
  rating,
  size = "md",
}: {
  rating: number;
  size?: "sm" | "md" | "lg";
}) {
  const rounded = Math.round(rating);
  const px = size === "lg" ? 22 : size === "sm" ? 14 : 16;

  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} van 5 sterren`}>
      {Array.from({ length: 5 }, (_, index) => {
        const filled = index < rounded;
        return (
          <svg
            key={index}
            width={px}
            height={px}
            viewBox="0 0 24 24"
            className={cn(filled ? "text-[#f4b400]" : "text-neutral-200")}
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M12 2.6 14.7 8.4l6.4.9-4.6 4.5 1.1 6.4L12 17.2 6.4 20.2l1.1-6.4L2.9 9.3l6.4-.9z"
            />
          </svg>
        );
      })}
    </span>
  );
}
