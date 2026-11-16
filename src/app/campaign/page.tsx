import type { Metadata } from "next";
import { CampaignView } from "@/components/views/campaign-view";

export const metadata: Metadata = {
  title: "90-day campaign",
  description:
    "A one-page, four-phase marketing campaign for Ultra Urgent Care & Pain Management in Chicago and Hoffman Estates.",
  robots: { index: false, follow: false },
};

export default function CampaignPage() {
  return <CampaignView />;
}
