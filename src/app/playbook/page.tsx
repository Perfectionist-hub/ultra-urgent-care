import type { Metadata } from "next";
import { PlaybookView } from "@/components/views/playbook-view";

export const metadata: Metadata = {
  title: "Practice playbook",
  description: "A 90-day marketing plan for Ultra Urgent Care & Pain Management.",
  robots: { index: false, follow: false },
};

export default function PlaybookPage() {
  return <PlaybookView />;
}
