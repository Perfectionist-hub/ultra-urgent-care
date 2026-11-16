import type { Metadata } from "next";
import { TreatView } from "@/components/views/treat-view";

export const metadata: Metadata = {
  title: "What we treat",
  description: "Illness, injury, labs, physicals, pain, and video psychiatry at Ultra Urgent Care. Qué atiende Ultra Urgent Care.",
};

export default function WhatWeTreatPage() {
  return <TreatView />;
}
