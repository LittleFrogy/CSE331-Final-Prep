import { Callout, Grammar, P, Proof, Section } from "@/components/blocks";
import { Link } from "@tanstack/react-router";
import type { TopicSlug } from "@/lib/content";

const ROWS: { n: string; co: string; what: string; min: string; slug: TopicSlug }[] = [
  { n: "1", co: "CO5", what: "Pumping lemma, one language, full proof", min: "12", slug: "pumping" },
  { n: "2", co: "CO3", what: "5–7 CFG subparts, including intersection", min: "25", slug: "cfg" },
  { n: "3", co: "CO3", what: "Leftmost derivation + 3 parse trees + unique trees", min: "18", slug: "cfg" },
  { n: "4", co: "CO3", what: "Three PDA state diagrams", min: "18", slug: "pda" },
  { n: "5", co: "CO4", what: "TM config + two diagrams + a 2-mark proof", min: "20", slug: "tm" },
  { n: "6", co: "bonus", what: "HALT / complement of RE / a DFA language decidable", min: "if time", slug: "halt" },
];

export function ExamBankNotes() {
  return (
    <div className="space-y-12">
      <Section kicker="110 minutes · 50 marks" title="How the paper is built">
        <P>
          Six problems, first five compulsory, last optional. The live papers (Summer 2025, sets
          A/B and the sister paper) recycle the same COs in the same order. Allocate time before
          you write a single production.
        </P>
        <div className="overflow-x-auto rounded-lg bg-surface shadow-[var(--shadow-border)]">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-[0.7rem] uppercase tracking-[0.12em] text-muted">
                <th className="px-3 py-2.5">#</th>
                <th className="px-3 py-2.5">CO</th>
                <th className="px-3 py-2.5">What they ask</th>
                <th className="px-3 py-2.5">Min</th>
                <th className="px-3 py-2.5">Open</th>
              </tr>
            </thead>
            <tbody className="text-ink-soft">
              {ROWS.map((r) => (
                <tr key={r.n} className="border-b border-line/70 last:border-0">
                  <td className="px-3 py-2.5 font-mono text-accent">{r.n}</td>
                  <td className="px-3 py-2.5">{r.co}</td>
                  <td className="px-3 py-2.5">{r.what}</td>
                  <td className="px-3 py-2.5 tabular-nums">{r.min}</td>
                  <td className="px-3 py-2.5">
                    <Link
                      to="/topics/$slug"
                      params={{ slug: r.slug }}
                      className="text-accent underline-offset-2 hover:underline"
                    >
                      notes
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Problem 1 — pumping, write this shape">
        <Grammar
          lines={[
            "Assume L regular. Let p be the pumping length.",
            "Let s =  …  ∈ L,  |s| ≥ p.",
            "s = xyz with |y| > 0 and |xy| ≤ p.",
            "Hence y lies in  …  so y =  …",
            "Consider i = 0 (or 2). Then xyⁱz = … ∉ L.",
            "Contradiction. L is not regular.",
          ]}
        />
        <P>
          Worked instances (floor-mod-4 language, the i=1-then-j=k-else-not language, 0ⁿ1ⁿ,
          squares, i {">"} j) live in the pumping chapter.
        </P>
      </Section>

      <Section title="Problem 2 — CFG battery">
        <P>
          Typical set: palindrome, “every second letter is a”, more-b-than-a, two intersections,
          a 1-mark enumeration, a 1-mark count. The intersection with “every second letter is a”
          often collapses to a regular language of a very specific shape — compute that shape
          before writing productions. Full solutions are in the CFG chapter.
        </P>
      </Section>

      <Section title="Problem 3 — trees">
        <P>
          One leftmost derivation (3), the matching tree (2), two more trees for the same string
          (4), two length-4 strings with a unique tree (1). The distinguished terminal in S → P a Q
          (or S → P 0 Q) is the ambiguity engine — each occurrence of that terminal is a different
          tree.
        </P>
      </Section>

      <Section title="Problem 4 — three PDAs">
        <P>
          Always: push $, push through region 1, ε-guess the boundary, pop through region 2, pop $
          into an accept state. Regular prefixes (starts with 10) still get a PDA, not a DFA —
          they asked for a PDA.
        </P>
      </Section>

      <Section title="Problem 5 — TM">
        <P>
          Configuration uqv: tape uv, head on first of v. Then two diagrams from equal 0s and 1s,
          palindrome, w#w, wwᴿ, every 1 followed by a 0, 0ⁿ1ⁿ. Then a 2-mark closure: sequential
          composition of deciders for intersection.
        </P>
      </Section>

      <Section title="Bonus — HALT and complement">
        <Proof title="RE is not closed under complement">
          <P>
            HALT_TM is recognizable and undecidable. If RE were closed under complement, HALT_TM
            and its complement would both be recognizable, hence decidable by dovetailing. Impossible.
          </P>
        </Proof>
        <Proof title="L = { ⟨D⟩ | every string D accepts contains a 1 } is decidable">
          <P>
            Equivalent to L(D) ∩ 0* = ∅. Product construction with a DFA for 0*, then the E_DFA
            emptiness decider.
          </P>
        </Proof>
      </Section>

      <Callout kind="exam" title="What to do in the last 8 minutes">
        <P>
          Do not start a new diagram. Go back to Problem 2(d)/(g) (the 1-mark enumerations) and
          Problem 3(d) (two length-4 strings). Those four marks are faster than a half-drawn PDA.
        </P>
      </Callout>
    </div>
  );
}
