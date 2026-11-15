"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocale } from "@/components/locale-provider";
import { answerQuestion, chatIntro } from "@/lib/chat";

type Turn = { from: "desk" | "you"; text: string };

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const { locale } = useLocale();
  const intro = chatIntro(locale);
  const [suggestions, setSuggestions] = useState<string[]>(intro.suggestions);
  const [turns, setTurns] = useState<Turn[]>([{ from: "desk", text: intro.greeting }]);
  const panelId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const next = chatIntro(locale);
    setSuggestions(next.suggestions);
    setTurns((current) => (current.length <= 1 ? [{ from: "desk", text: next.greeting }] : current));
  }, [locale]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [turns, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function ask(question: string) {
    const cleaned = question.trim();
    if (!cleaned) return;
    const reply = answerQuestion(cleaned, locale);
    setTurns((current) => [
      ...current,
      { from: "you", text: cleaned },
      { from: "desk", text: reply.text },
    ]);
    setSuggestions(reply.suggestions);
    setDraft("");
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    ask(draft);
  }

  return (
    <div className="site-chrome">
      {open ? (
        <section
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-labelledby={`${panelId}-title`}
          className="fixed inset-x-0 bottom-0 z-50 flex h-[100dvh] flex-col bg-card md:inset-auto md:bottom-6 md:right-6 md:h-[36rem] md:w-[23.5rem] md:overflow-hidden md:rounded-[1.6rem] md:border md:border-border md:shadow-2xl"
        >
          <header className="flex items-start justify-between gap-3 bg-ink px-4 py-4 text-primary-foreground">
            <div>
              <p id={`${panelId}-title`} className="font-display text-xl tracking-tight">
                {intro.title}
              </p>
              <p className="text-xs text-foam">{intro.subtitle}</p>
            </div>
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-full bg-white/10"
              onClick={() => setOpen(false)}
            >
              <X className="size-4" />
              <span className="sr-only">{intro.close}</span>
            </button>
          </header>
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {turns.map((turn, index) => (
              <p
                key={`${turn.from}-${index}`}
                className={
                  turn.from === "you"
                    ? "ml-8 rounded-2xl rounded-br-md bg-primary px-3 py-2 text-sm leading-relaxed text-primary-foreground"
                    : "mr-6 rounded-2xl rounded-bl-md bg-sand px-3 py-2 text-sm leading-relaxed text-foreground"
                }
              >
                {turn.text}
              </p>
            ))}
            <div ref={endRef} />
          </div>
          <div className="border-t border-border px-4 py-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="rounded-full border border-border px-3 py-1 text-left text-xs hover:bg-muted"
                  onClick={() => ask(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
            <form onSubmit={onSubmit} className="flex gap-2">
              <Input
                ref={inputRef}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={intro.placeholder}
                aria-label={intro.label}
                maxLength={500}
                className="h-11 md:text-sm"
              />
              <Button type="submit" className="h-11 rounded-full px-4">
                {intro.send}
              </Button>
            </form>
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
              {intro.fine}
            </p>
          </div>
        </section>
      ) : (
        <button
          type="button"
          className="fixed right-4 bottom-20 z-50 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-3 text-sm text-primary-foreground shadow-lg md:bottom-6"
          aria-expanded={false}
          aria-controls={panelId}
          onClick={() => setOpen(true)}
        >
          <MessageCircle className="size-4" />
          {intro.button}
        </button>
      )}
    </div>
  );
}
