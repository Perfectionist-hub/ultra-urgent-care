"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export function ClinicQr({ value, label, className = "size-28" }: { value: string; label: string; className?: string }) {
  const [src, setSrc] = useState("");

  useEffect(() => {
    let cancelled = false;
    QRCode.toString(value, {
      type: "svg",
      margin: 1,
      color: { dark: "#17312f", light: "#ffffff" },
    }).then((markup) => {
      if (!cancelled) setSrc(markup);
    });
    return () => {
      cancelled = true;
    };
  }, [value]);

  if (!src) {
    return <div className="size-28 rounded-md bg-white" aria-hidden />;
  }

  return (
    <div
      className={`${className} bg-white [&_svg]:h-full [&_svg]:w-full`}
      role="img"
      aria-label={label}
      dangerouslySetInnerHTML={{ __html: src }}
    />
  );
}
