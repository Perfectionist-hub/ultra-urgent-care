import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceView } from "@/components/views/service-view";
import { serviceBySlug, services } from "@/lib/clinic";

type Params = { slug: string };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return { title: "Care" };
  return { title: service.name, description: service.promise };
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  if (!serviceBySlug(slug)) notFound();
  return <ServiceView slug={slug} />;
}
