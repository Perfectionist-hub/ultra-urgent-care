import type { MetadataRoute } from "next";
import { practice, services } from "@/lib/clinic";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/services",
    ...services.map((service) => `/services/${service.slug}`),
    "/providers",
    "/locations",
    "/visit",
    "/flyer",
  ];
  return paths.map((path) => ({
    url: `${practice.website}${path}`,
    lastModified: new Date("2026-11-15"),
  }));
}
