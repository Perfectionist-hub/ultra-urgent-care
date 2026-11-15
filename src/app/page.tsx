import type { Metadata } from "next";
import { HomeView } from "@/components/views/home-view";

export const metadata: Metadata = {
  description:
    "Walk-in urgent care in Chicago and Hoffman Estates. Atención de urgencias sin cita. Pain care with Dr. Ahsan and virtual psychiatry. Hoffman Estates until 10 PM.",
};

export default function HomePage() {
  return <HomeView />;
}
