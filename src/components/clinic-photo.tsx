import Image from "next/image";
import { photos, type PhotoName } from "@/lib/gallery";

export function ClinicPhoto({
  name,
  alt,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 40vw, 100vw",
}: {
  name: PhotoName;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const photo = photos[name];
  return (
    <Image
      src={photo.src}
      alt={alt}
      width={photo.width}
      height={photo.height}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}
