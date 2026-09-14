import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PageWidth, Shell } from "@/components/layout";
import { HIERARCHY, QUIZ, TOPICS } from "@/lib/content";
import { loadProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [done, setDone] = useState<string[]>([]);
  const [best, setBest] = useState(0);

  useEffect(() => {
    const p = loadProgress();
    setDone(p.completed);
    setBest(p.quizBest);
  }, []);

  const pct = Math.round((done.length / TOPICS.length) * 100);

  return (
    <Shell>
      <PageWidth className="pb-20 pt-10 sm:pt-14">
        <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.2em] text-accent">
              CSE331 · Automata and Computability
            </p>
            <h1 className="mt-3 font-display text-[2.6rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Final Lab
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
              Step-by-step notes from pumping lemma to reducibility, written against the 50-mark /
              110-minute paper. Worked proofs, PDA and TM diagrams, the T/F battery, and a
              printable PDF.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/topics/$slug" params={{ slug: "pumping" }}>
                  Start with pumping
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="ink">
                <Link to="/print">
                  <Download className="size-4" />
                  Print / PDF
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/quiz">18-question drill</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <div className="flex items-baseline justify-between">
              <p className="text-[0.7rem] uppercase tracking-[0.16em] text-muted">Progress</p>
              <p className="font-mono text-sm tabular-nums text-accent">{pct}%</p>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-bg-sunken">
              <div
                className="h-full bg-accent transition-[width] duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="mt-3 text-sm text-muted">
              {done.length} of {TOPICS.length} chapters · drill best {best}/{QUIZ.length}
            </p>
            <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-faint">
              Chomsky chain
            </p>
            <ol className="mt-2 space-y-1.5">
              {HIERARCHY.map((h, i) => (
                <li key={h.name} className="flex gap-3 text-sm">
                  <span className="font-mono text-faint">0{i + 1}</span>
                  <span>
                    <span className="text-ink">{h.name}</span>
                    <span className="block text-[0.8rem] text-muted">{h.note}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <h2 className="mt-16 font-display text-2xl font-semibold tracking-tight">The seven chapters</h2>
        <p className="mt-1 text-muted">Learn the idea, then the exam method, then a worked paper question.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {TOPICS.map((t) => {
            const complete = done.includes(t.slug);
            return (
              <Link
                key={t.slug}
                to="/topics/$slug"
                params={{ slug: t.slug }}
                className="group rounded-xl bg-surface p-5 shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-200 hover:shadow-[var(--shadow-border-hover)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-accent">
                    {t.no} · {t.co} · {t.marks} marks
                  </p>
                  {complete && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-ok-soft px-2 py-0.5 text-[0.7rem] text-ok">
                      <Check className="size-3" />
                      Done
                    </span>
                  )}
                </div>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight group-hover:text-accent-2">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t.short}</p>
                <p className="mt-3 text-[0.8rem] text-muted">{t.exam}</p>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 grid gap-3 lg:grid-cols-3">
          {[
            {
              to: "/exam" as const,
              k: "Paper map",
              t: "Exam bank",
              d: "How the 50 marks fall, what to write first, what to skip at minute 102.",
            },
            {
              to: "/cheatsheet" as const,
              k: "Memory",
              t: "Cheatsheet",
              d: "Closure table, CFG templates, PDA/TM labels, the reduction compass.",
            },
            {
              to: "/quiz" as const,
              k: "Recall",
              t: "Drill",
              d: "Eighteen questions from T/F, configurations, and the direction of reductions.",
            },
          ].map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className={cn(
                "rounded-xl bg-ink px-5 py-5 text-bg transition-transform duration-150 hover:bg-tape",
              )}
            >
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-bg/55">{c.k}</p>
              <h3 className="mt-1 font-display text-xl font-semibold">{c.t}</h3>
              <p className="mt-2 text-sm text-bg/75">{c.d}</p>
            </Link>
          ))}
        </div>
      </PageWidth>
    </Shell>
  );
}
