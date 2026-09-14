import { cn } from "@/lib/utils";

export function Section({
  id,
  kicker,
  title,
  children,
}: {
  id?: string;
  kicker?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 space-y-4">
      {kicker && (
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-accent">{kicker}</p>
      )}
      <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]">
        {title}
      </h2>
      <div className="space-y-3 text-[1.05rem] leading-[1.62] text-ink-soft">{children}</div>
    </section>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}

export function M({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("font-mono text-[0.9em] tracking-tight text-ink", className)}>{children}</span>
  );
}

export function Callout({
  kind = "tip",
  title,
  children,
}: {
  kind?: "tip" | "exam" | "trap" | "ok";
  title: string;
  children: React.ReactNode;
}) {
  const styles = {
    tip: "bg-accent-soft/70 text-accent-2",
    exam: "bg-warn-soft text-warn",
    trap: "bg-danger-soft text-danger",
    ok: "bg-ok-soft text-ok",
  } as const;
  const labels = { tip: "Method", exam: "Exam", trap: "Trap", ok: "Remember" };
  return (
    <aside className={cn("rounded-lg px-4 py-3.5 sm:px-5", styles[kind])}>
      <p className="mb-1 text-[0.68rem] font-medium uppercase tracking-[0.16em]">{labels[kind]}</p>
      <p className="font-display text-lg font-semibold tracking-tight text-ink">{title}</p>
      <div className="mt-1.5 space-y-2 text-[0.98rem] leading-relaxed text-ink-soft">{children}</div>
    </aside>
  );
}

export function Steps({ items }: { items: { n: string; t: string; d: string }[] }) {
  return (
    <ol className="space-y-3">
      {items.map((s) => (
        <li
          key={s.n}
          className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 rounded-lg bg-surface p-4 shadow-[var(--shadow-border)]"
        >
          <span className="font-mono text-sm text-accent">{s.n}</span>
          <p className="font-medium text-ink">{s.t}</p>
          <span />
          <p className="text-[0.98rem] text-muted">{s.d}</p>
        </li>
      ))}
    </ol>
  );
}

export function Grammar({
  title,
  lines,
}: {
  title?: string;
  lines: string[];
}) {
  return (
    <figure className="overflow-x-auto rounded-lg bg-tape px-4 py-3.5 text-bg shadow-[var(--shadow-border)]">
      {title && (
        <figcaption className="mb-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-bg/60">
          {title}
        </figcaption>
      )}
      <pre className="font-mono text-[0.86rem] leading-7 sm:text-[0.92rem]">
        {lines.join("\n")}
      </pre>
    </figure>
  );
}

export function Proof({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5">
      <p className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-accent">Proof</p>
      <h3 className="mt-1 font-display text-xl font-semibold tracking-tight">{title}</h3>
      <div className="mt-3 space-y-2.5 text-[1.02rem] leading-[1.6] text-ink-soft">{children}</div>
    </div>
  );
}

export function Table({
  head,
  rows,
}: {
  head: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-lg bg-surface shadow-[var(--shadow-border)]">
      <table className="w-full min-w-[28rem] text-left text-sm">
        <thead>
          <tr className="border-b border-line text-[0.7rem] uppercase tracking-[0.12em] text-muted">
            {head.map((h) => (
              <th key={h} className="px-3 py-2.5 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-line/70 last:border-0">
              {r.map((c, j) => (
                <td
                  key={j}
                  className={cn("px-3 py-2.5 align-top text-ink-soft", j === 0 && "font-medium text-ink")}
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Deriv({ steps }: { steps: string[] }) {
  return (
    <ol className="overflow-x-auto rounded-lg bg-surface-2 px-4 py-3 font-mono text-[0.86rem] leading-7 text-ink sm:text-[0.92rem]">
      {steps.map((s, i) => (
        <li key={i} className="flex gap-3">
          <span className="w-6 shrink-0 text-faint">{i + 1}.</span>
          <span>
            {i === 0 ? s : (
              <>
                <span className="text-muted">⇒ </span>
                {s}
              </>
            )}
          </span>
        </li>
      ))}
    </ol>
  );
}
