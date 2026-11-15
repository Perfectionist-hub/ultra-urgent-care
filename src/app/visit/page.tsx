import type { Metadata } from "next";
import { VisitView } from "@/components/views/visit-view";

export const metadata: Metadata = {
  title: "Request a callback",
  description: "Ask Ultra Urgent Care to call you back. Pida que Ultra Urgent Care le devuelva la llamada. Nothing is stored on the website.",
};

export default function VisitPage() {
  return <VisitView />;
}
