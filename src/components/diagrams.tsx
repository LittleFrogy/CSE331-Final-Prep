import { cn } from "@/lib/utils";

type Node = {
  id: string;
  x: number;
  y: number;
  label: string;
  start?: boolean;
  accept?: boolean;
};

type Edge = {
  from: string;
  to: string;
  label: string;
  dy?: number;
  side?: "arc" | "loop" | "line";
  sweep?: boolean;
};

export function Machine({
  caption,
  nodes,
  edges,
  w = 720,
  h = 220,
}: {
  caption: string;
  nodes: Node[];
  edges: Edge[];
  w?: number;
  h?: number;
}) {
  const map = Object.fromEntries(nodes.map((n) => [n.id, n]));
  return (
    <figure className="rounded-xl bg-surface p-3 shadow-[var(--shadow-border)] sm:p-4">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="h-auto w-full"
        role="img"
        aria-label={caption}
      >
        {edges.map((e, i) => {
          const a = map[e.from];
          const b = map[e.to];
          if (!a || !b) return null;
          if (e.side === "loop" || a.id === b.id) {
            const x = a.x;
            const y = a.y - 22;
            return (
              <g key={i}>
                <path
                  d={`M ${x - 10} ${a.y - 16} C ${x - 28} ${a.y - 52}, ${x + 28} ${a.y - 52}, ${x + 10} ${a.y - 16}`}
                  fill="none"
                  stroke="#1a1814"
                  strokeWidth="1.4"
                  markerEnd="url(#arr)"
                />
                <text x={x} y={y - 34} textAnchor="middle" fontSize="11" fontFamily="ui-monospace, monospace" fill="#245568">
                  {e.label}
                </text>
              </g>
            );
          }
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const len = Math.hypot(dx, dy) || 1;
          const ux = dx / len;
          const uy = dy / len;
          const r = 16;
          const x1 = a.x + ux * r;
          const y1 = a.y + uy * r;
          const x2 = b.x - ux * r;
          const y2 = b.y - uy * r;
          const mx = (x1 + x2) / 2;
          const my = (y1 + y2) / 2;
          const offset = e.dy ?? (e.side === "arc" ? (e.sweep ? 28 : -28) : 0);
          const px = -uy;
          const py = ux;
          const cx = mx + px * offset;
          const cy = my + py * offset;
          const d =
            offset === 0
              ? `M ${x1} ${y1} L ${x2} ${y2}`
              : `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
          const lx = offset === 0 ? mx : cx;
          const ly = (offset === 0 ? my : cy) - 8;
          return (
            <g key={i}>
              <path d={d} fill="none" stroke="#1a1814" strokeWidth="1.4" markerEnd="url(#arr)" />
              <text x={lx} y={ly} textAnchor="middle" fontSize="11" fontFamily="ui-monospace, monospace" fill="#245568">
                {e.label}
              </text>
            </g>
          );
        })}
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#1a1814" />
          </marker>
        </defs>
        {nodes.map((n) => (
          <g key={n.id}>
            {n.start && (
              <line x1={n.x - 34} y1={n.y} x2={n.x - 18} y2={n.y} stroke="#1a1814" strokeWidth="1.4" markerEnd="url(#arr)" />
            )}
            <circle cx={n.x} cy={n.y} r="16" fill="#fbfaf6" stroke="#1a1814" strokeWidth="1.5" />
            {n.accept && (
              <circle cx={n.x} cy={n.y} r="12.2" fill="none" stroke="#1a1814" strokeWidth="1.2" />
            )}
            <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="11" fontFamily="ui-monospace, monospace" fill="#1a1814">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-2 text-sm text-muted">{caption}</figcaption>
    </figure>
  );
}

type TNode = { label: string; kids?: TNode[] };

function layout(t: TNode, x: number, y: number, gap: number): { nodes: { l: string; x: number; y: number }[]; lines: { x1: number; y1: number; x2: number; y2: number }[]; w: number } {
  if (!t.kids || t.kids.length === 0) {
    return { nodes: [{ l: t.label, x, y }], lines: [], w: 56 };
  }
  let cursor = x;
  const childLayouts = t.kids.map((k) => {
    const L = layout(k, cursor, y + 56, gap);
    cursor += L.w + gap;
    return L;
  });
  const totalW = childLayouts.reduce((s, c, i) => s + c.w + (i ? gap : 0), 0);
  const first = childLayouts[0];
  const last = childLayouts[childLayouts.length - 1];
  const cx = (first.nodes[0].x + last.nodes[0].x) / 2;
  const nodes = [{ l: t.label, x: cx, y }, ...childLayouts.flatMap((c) => c.nodes)];
  const lines = [
    ...childLayouts.flatMap((c) => [{ x1: cx, y1: y + 12, x2: c.nodes[0].x, y2: c.nodes[0].y - 12 }, ...c.lines]),
  ];
  return { nodes, lines, w: totalW };
}

export function ParseTree({
  caption,
  tree,
}: {
  caption: string;
  tree: TNode;
}) {
  const L = layout(tree, 40, 28, 12);
  const w = Math.max(L.w + 80, 280);
  const h = Math.max(...L.nodes.map((n) => n.y)) + 40;
  return (
    <figure className="rounded-xl bg-surface p-3 shadow-[var(--shadow-border)] sm:p-4">
      <svg viewBox={`0 0 ${w} ${h}`} className="h-auto w-full" role="img" aria-label={caption}>
        {L.lines.map((ln, i) => (
          <line key={i} {...ln} stroke="#1a1814" strokeWidth="1.2" />
        ))}
        {L.nodes.map((n, i) => (
          <g key={i}>
            <rect
              x={n.x - 16}
              y={n.y - 12}
              width="32"
              height="24"
              rx="4"
              fill="#fbfaf6"
              stroke="#1a1814"
              strokeWidth="1.1"
            />
            <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="12" fontFamily="ui-monospace, monospace">
              {n.l}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-2 text-sm text-muted">{caption}</figcaption>
    </figure>
  );
}

export function Tape({
  cells,
  head,
  state,
}: {
  cells: string[];
  head: number;
  state: string;
}) {
  return (
    <div className="flex flex-wrap items-end gap-2">
      <span className="mb-1 font-mono text-sm text-accent">{state}</span>
      <div className="flex overflow-x-auto">
        {cells.map((c, i) => (
          <div key={i} className="flex w-9 flex-col items-center">
                    {i === head && (
          <span className="mb-0.5 grid h-3 place-items-center">
            <svg width="8" height="6" viewBox="0 0 8 6" aria-hidden="true">
              <path d="M4 6 L0 0 H8 Z" fill="currentColor" className="text-accent" />
            </svg>
          </span>
        )}
            <div
              className={cn(
                "grid h-9 w-9 place-items-center border border-line-strong font-mono text-sm",
                i === head ? "bg-accent-soft text-accent-2" : "bg-surface",
              )}
            >
              {c}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
