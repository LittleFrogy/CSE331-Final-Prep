import { Link } from "@tanstack/react-router";
import { Check, ChevronLeft } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { PageWidth, Shell } from "@/components/layout";
import type { Topic } from "@/lib/content";
import { loadProgress, toggleComplete } from "@/lib/progress";
import { NOTES } from "@/notes";
import { cn } from "@/lib/utils";

export function TopicPage({ topic }: { topic: Topic }) {
  const [done, setDone] = useState(false);
  const Body = NOTES[topic.slug];

  useEffect(() => {
    setDone(loadProgress().completed.includes(topic.slug));
  }, [topic.slug]);

  const next = useMemo(() => {
    const order = [
      "pumping",
      "cfg",
      "pda",
      "tm",
      "halt",
      "decidability",
      "reducibility",
    ] as const;
    const i = order.indexOf(topic.slug);
    return order[i + 1];
  }, [topic.slug]);

  return (
    <Shell>
      <PageWidth className="py-8 sm:py-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-ink"
          >
            <ChevronLeft className="size-4" />
            Desk
          </Link>
          <Button
            variant={done ? "secondary" : "primary"}
            size="sm"
            onClick={() => setDone(toggleComplete(topic.slug).completed.includes(topic.slug))}
          >
            <Check className="size-3.5" />
            {done ? "Completed" : "Mark complete"}
          </Button>
        </div>

        <div className="grid gap-10 lg:grid-cols-[200px_minmax(0,1fr)]">
          <aside className="no-print hidden lg:block">
            <div className="sticky top-24 space-y-1">
              <p className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-faint">
                {topic.co} · {topic.marks} marks
              </p>
              {topic.sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block rounded-md px-2 py-1.5 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-ink"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </aside>

          <article>
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-accent">
              {topic.no} · {topic.co} · {topic.minutes}
            </p>
            <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              {topic.title}
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-ink-soft">{topic.short}</p>
            <p className="mt-2 text-sm text-muted">{topic.exam}</p>
            <div className="mt-10">
              <Body />
            </div>
            {next && (
              <div className="mt-14 border-t border-line pt-6">
                <Link
                  to="/topics/$slug"
                  params={{ slug: next }}
                  className={cn(
                    "inline-flex items-center gap-2 text-accent transition-colors hover:text-accent-2",
                  )}
                >
                  Next chapter
                  <span className="font-display text-lg font-semibold capitalize">{next}</span>
                </Link>
              </div>
            )}
          </article>
        </div>
      </PageWidth>
    </Shell>
  );
}
