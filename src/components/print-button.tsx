"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/components/locale-provider";
import { getCopy } from "@/lib/ui-copy";

export function PrintButton() {
  const { locale } = useLocale();
  return (
    <Button type="button" className="h-11 rounded-full px-5" onClick={() => window.print()}>
      <Printer className="size-4" />
      {getCopy(locale).flyer.print}
    </Button>
  );
}
