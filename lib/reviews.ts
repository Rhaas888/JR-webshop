import { seededReviews, type ReviewSeed, type ReviewTopic } from "../convex/reviewData";

export { seededReviews, type ReviewSeed, type ReviewTopic };
export { reviewTopics } from "../convex/reviewData";

export type Review = ReviewSeed;

export function reviewTimestamp(daysAgo: number, now = Date.now()): number {
  return now - daysAgo * 24 * 60 * 60 * 1000;
}

export function formatNlRelative(timestamp: number, now = Date.now()): string {
  const days = Math.max(0, Math.round((now - timestamp) / (24 * 60 * 60 * 1000)));
  if (days <= 0) return "vandaag";
  if (days === 1) return "1 dag geleden";
  if (days < 7) return `${days} dagen geleden`;
  const weeks = Math.round(days / 7);
  if (weeks === 1) return "1 week geleden";
  if (weeks < 8) return `${weeks} weken geleden`;
  const months = Math.max(1, Math.round(days / 30));
  if (months === 1) return "1 maand geleden";
  return `${months} maanden geleden`;
}

export function averageRating(reviews: { rating: number }[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((total, review) => total + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

export function filterReviews<T extends { topic: ReviewTopic }>(
  reviews: T[],
  topic?: ReviewTopic,
): T[] {
  if (!topic) return reviews;
  return reviews.filter((review) => review.topic === topic);
}

export function toPublicReview(review: ReviewSeed, now = Date.now()) {
  return {
    name: review.name,
    role: review.role,
    company: review.company,
    initials: review.initials,
    rating: review.rating,
    text: review.text,
    topic: review.topic,
    createdAt: reviewTimestamp(review.daysAgo, now),
  };
}

export function seededPublicReviews(now = Date.now()) {
  return seededReviews.map((review, index) => ({
    _id: `seed-${index}`,
    ...toPublicReview(review, now),
  }));
}
