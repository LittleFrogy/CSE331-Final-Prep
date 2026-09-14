import { createFileRoute } from "@tanstack/react-router";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TOPICS } from "@/lib/content";
import { NOTES } from "@/notes";
import { CheatsheetBody } from "@/notes/cheatsheet-body";
import { ExamBankNotes } from "@/notes/exam-bank";

export const Route = createFileRoute("/print")({ component: PrintPage });

function PrintPage() {
  return (
    <div className="bg-bg text-ink">
      <div className="no-print sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-line bg-bg/95 px-4 py-3 backdrop-blur">
        <p className="font-display text-lg font-semibold">CSE331 Final Notes</p>
        <Button variant="ink" onClick={() => window.print()}>
          <Printer className="size-4" />
          Print / Save as PDF
        </Button>
      </div>

      <article className="mx-auto max-w-3xl px-5 py-10 print:max-w-none print:px-0 print:py-0">
        <header className="mb-10 border-b border-line pb-6">
          <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-accent">
            CSE331 · Automata and Computability
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">Final Lab</h1>
          <p className="mt-2 text-ink-soft">
            Full notes, exam method, and worked Summer-style problems. Regular ⊂ CFL ⊂ decidable ⊂
            recognizable.
          </p>
        </header>

        <section className="mb-16 break-after-page">
          <ExamBankNotes />
        </section>
        <section className="mb-16 break-after-page">
          <CheatsheetBody />
        </section>
        {TOPICS.map((t) => {
          const Body = NOTES[t.slug];
          return (
            <section key={t.slug} className="mb-16 break-after-page">
              <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-accent">
                {t.no} · {t.co} · {t.marks} marks
              </p>
              <h1 className="mb-8 mt-2 font-display text-4xl font-semibold tracking-tight">
                {t.title}
              </h1>
              <Body />
            </section>
          );
        })}
      </article>
    </div>
  );
}
