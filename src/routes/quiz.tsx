import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { PageWidth, Shell } from "@/components/layout";
import { QUIZ } from "@/lib/content";
import { setQuizBest } from "@/lib/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/quiz")({ component: QuizPage });

function QuizPage() {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = QUIZ[i];
  const total = QUIZ.length;

  const revealed = picked !== null;

  const onPick = (k: number) => {
    if (picked !== null) return;
    setPicked(k);
    if (k === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (i + 1 >= total) {
      setQuizBest(score);
      setDone(true);
      return;
    }
    setI((x) => x + 1);
    setPicked(null);
  };

  const restart = () => {
    setI(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  const displayScore = useMemo(() => score, [score]);

  if (done) {
    return (
      <Shell>
        <PageWidth className="py-16">
          <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-accent">Drill</p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">
            {displayScore} / {total}
          </h1>
          <p className="mt-3 max-w-xl text-lg text-ink-soft">
            {displayScore >= 15
              ? "Ready. Spend the remaining time drawing PDAs and parse trees from memory."
              : displayScore >= 10
                ? "The facts are there. Re-read the T/F chapter and the reduction compass, then try again."
                : "Back to the desk. Do pumping, then CFG templates, then the T/F list."}
          </p>
          <Button className="mt-6" onClick={restart}>
            Drill again
          </Button>
        </PageWidth>
      </Shell>
    );
  }

  return (
    <Shell>
      <PageWidth className="py-10 sm:py-12">
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-accent">
            Question {i + 1} of {total}
          </p>
          <p className="font-mono text-sm tabular-nums text-muted">
            {score} correct
          </p>
        </div>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-bg-sunken">
          <div
            className="h-full bg-accent transition-[width] duration-200"
            style={{ width: `${((i + (revealed ? 1 : 0)) / total) * 100}%` }}
          />
        </div>
        <h1 className="mt-8 max-w-3xl font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          {q.q}
        </h1>
        <ul className="mt-6 space-y-2">
          {q.options.map((opt, k) => {
            const isAns = k === q.answer;
            const isPick = k === picked;
            return (
              <li key={k}>
                <button
                  type="button"
                  onClick={() => onPick(k)}
                  className={cn(
                    "w-full rounded-lg px-4 py-3.5 text-left text-[1.02rem] leading-snug shadow-[var(--shadow-border)] transition-[background-color,box-shadow] duration-150",
                    !revealed && "bg-surface hover:shadow-[var(--shadow-border-hover)]",
                    revealed && isAns && "bg-ok-soft text-ok",
                    revealed && isPick && !isAns && "bg-danger-soft text-danger",
                    revealed && !isAns && !isPick && "bg-surface text-muted",
                  )}
                >
                  <span className="mr-3 font-mono text-xs text-faint">{String.fromCharCode(65 + k)}</span>
                  {opt}
                </button>
              </li>
            );
          })}
        </ul>
        {revealed && (
          <div className="mt-6 rounded-lg bg-accent-soft/70 px-4 py-3 text-ink-soft">
            <p className="text-[0.7rem] uppercase tracking-[0.16em] text-accent">Why</p>
            <p className="mt-1">{q.why}</p>
            <Button className="mt-4" onClick={next}>
              {i + 1 >= total ? "See score" : "Next"}
            </Button>
          </div>
        )}
      </PageWidth>
    </Shell>
  );
}
