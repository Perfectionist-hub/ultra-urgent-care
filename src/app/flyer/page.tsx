import type { Metadata } from "next";
import { FlyerView } from "@/components/views/flyer-view";

export const metadata: Metadata = {
  title: "Flyer",
  description: "A bilingual print-ready flyer for Ultra Urgent Care, in English and Spanish, with both clinics and walk-in hours.",
};

export default function FlyerPage() {
  return <FlyerView />;
}
