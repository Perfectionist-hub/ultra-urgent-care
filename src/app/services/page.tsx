import type { Metadata } from "next";
import { ServicesView } from "@/components/views/services-view";

export const metadata: Metadata = {
  title: "Care",
  description: "Urgent care, pain management, and virtual psychiatry. Urgencias, manejo del dolor y psiquiatría por video.",
};

export default function ServicesPage() {
  return <ServicesView />;
}
