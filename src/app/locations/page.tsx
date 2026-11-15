import type { Metadata } from "next";
import { LocationsView } from "@/components/views/locations-view";

export const metadata: Metadata = {
  title: "Locations and hours",
  description: "95th Street is open noon to 6. Hoffman Estates is open 2 to 10 PM. Calle 95, mediodía a 6. Hoffman Estates, 2 a 10 p. m. Closed Sunday.",
};

export default function LocationsPage() {
  return <LocationsView />;
}
