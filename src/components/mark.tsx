import Link from "next/link";
import { cn } from "cn";

export function Mark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="size-[54%]">
        <path d="M10.2 3.5h3.6v17H10.2zM3.5 10.2h17v3.6h-17z" fill="currentColor" />
      </svg>
    </span>
  );
}

export function Wordmark({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Mark className={inverted ? "bg-foam text-ink" : undefined} />
      <span className="leading-tight">
        <span className={cn("block font-display text-lg tracking-tight", inverted && "text-primary-foreground")}>
          Ultra
        </span>
        <span className={cn("block text-[11px] tracking-[0.14em] uppercase", inverted ? "text-foam" : "text-muted-foreground")}>
          Urgent Care & Pain
        </span>
      </span>
    </Link>
  );
}
