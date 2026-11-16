import type { Metadata } from "next";
import { BookView } from "@/components/views/book-view";

export const metadata: Metadata = {
  title: "Book a visit",
  description:
    "Request a time at Ultra Urgent Care in Chicago or Hoffman Estates. Pida una hora en Ultra Urgent Care. The clinic confirms by phone. Nothing is stored on the website.",
};

type Search = { visit?: string; location?: string; concern?: string };

export default async function BookPage({ searchParams }: { searchParams: Promise<Search> }) {
  const params = await searchParams;
  return <BookView initialVisit={params.visit} initialLocation={params.location} initialConcern={params.concern} />;
}
