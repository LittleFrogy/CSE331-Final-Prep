import { createFileRoute } from "@tanstack/react-router";
import { PageWidth, Shell } from "@/components/layout";
import { ExamBankNotes } from "@/notes/exam-bank";

export const Route = createFileRoute("/exam")({ component: ExamPage });

function ExamPage() {
  return (
    <Shell>
      <PageWidth className="py-10 sm:py-12">
        <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-accent">
          Summer paper · 50 marks
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Exam bank
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-soft">
          The live finals share a skeleton. Learn the skeleton, then the variants.
        </p>
        <div className="mt-10">
          <ExamBankNotes />
        </div>
      </PageWidth>
    </Shell>
  );
}
