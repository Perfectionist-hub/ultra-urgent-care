import type { Metadata } from "next";
import { InsuranceView } from "@/components/views/insurance-view";

export const metadata: Metadata = {
  title: "Insurance",
  description: "Most major insurance plans and self-pay at Ultra Urgent Care. Call with your plan name before you come. Seguro y pago particular.",
};

export default function InsurancePage() {
  return <InsuranceView />;
}
