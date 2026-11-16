import type { Metadata } from "next";
import { ReviewsView } from "@/components/views/reviews-view";

export const metadata: Metadata = {
  title: "Google reviews",
  description: "Open the Google listing for Ultra Urgent Care on 95th Street or in Hoffman Estates. Reseñas de Google de Ultra Urgent Care.",
};

export default function ReviewsPage() {
  return <ReviewsView />;
}
