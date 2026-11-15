import type { MetadataRoute } from "next";
import { practice } from "@/lib/clinic";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/playbook"],
    },
    sitemap: `${practice.website}/sitemap.xml`,
  };
}
