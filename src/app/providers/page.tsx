import type { Metadata } from "next";
import { ProvidersView } from "@/components/views/providers-view";

export const metadata: Metadata = {
  title: "Providers",
  description: "Dr. Ahsan for pain management and Lt. Col. (Ret.) Virpal Sidhu for virtual psychiatry.",
};

export default function ProvidersPage() {
  return <ProvidersView />;
}
