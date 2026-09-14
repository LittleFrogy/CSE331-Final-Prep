import { Callout, Grammar, M, P, Proof, Section, Steps, Table } from "@/components/blocks";
import { Machine, Tape } from "@/components/diagrams";

export function TmNotes() {
  return (
    <div className="space-y-12">
      <Section id="idea" kicker="CO4 · 10 marks" title="The machine that is a computer">
        <P>
          A Turing machine is a 7-tuple <M>(Q, Σ, Γ, δ, q₀, q_acc, q_rej)</M>. Finite control, an
          infinite tape, a head that reads, writes, and moves L or R. Blank ⊔ is in Γ, not in Σ.
        </P>
        <P>Four differences with finite automata: write, two-way head, infinite tape, halt states fire immediately.</P>
        <Grammar
          title="Transition on a diagram"
          lines={[
            "x → y, R     read x, write y, move right, take the edge",
            "x → R        shorthand: write x (unchanged), move right",
            "missing edge  implicit reject",
          ]}
        />
      </Section>

      <Section id="config" title="Configurations — the 1-mark gift">
        <P>
          The triple (state, tape, head) is written <M>u q v</M>: tape = uv, state = q, head on the
          first symbol of v.
        </P>
        <div className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
          <p className="mb-3 font-mono text-sm text-ink">10q₃1011</p>
          <Tape cells={["1", "0", "1", "0", "1", "1"]} head={2} state="q₃" />
          <p className="mt-3 text-sm text-muted">
            Tape contents 101011 · current state q₃ · head on the first 1 of the suffix 1011
            (the third cell, 0-based index 2).
          </p>
        </div>
        <P>
          Exam variant <M>11q₃000</M>: tape 11000, state q₃, head on the first 0. Always write all
          three of: contents, state, head position.
        </P>
      </Section>

      <Section id="method" title="How to design a TM on the paper">
        <Steps
          items={[
            {
              n: "01",
              t: "Cross-off, don’t count in states.",
              d: "For 0ⁿ1ⁿ: mark a 0 as x, scan to a 1, mark it x, rewind, repeat. Finite control only stores the phase.",
            },
            {
              n: "02",
              t: "Zigzag for copies and palindromes.",
              d: "w#w: remember the current symbol in the state, run to the matching cell past #, check, cross both, return.",
            },
            {
              n: "03",
              t: "Accept / reject immediately.",
              d: "Missing transitions go to q_rej. Draw q_acc as a double circle. Do not draw q_rej.",
            },
            {
              n: "04",
              t: "Sweep blanks at the end.",
              d: "When every input symbol is crossed, scan to a blank to be sure nothing remains.",
            },
          ]}
        />
      </Section>

      <Section id="worked" title="Worked machines">
        <Proof title="Contains 11">
          <Machine
            caption="A DFA in TM clothing: never writes, only moves R. Seeing 11 accepts."
            w={520}
            h={160}
            nodes={[
              { id: "q0", x: 80, y: 90, label: "q0", start: true },
              { id: "q1", x: 250, y: 90, label: "q1" },
              { id: "qa", x: 430, y: 90, label: "acc", accept: true },
            ]}
            edges={[
              { from: "q0", to: "q0", label: "0 → R", side: "loop" },
              { from: "q0", to: "q1", label: "1 → R" },
              { from: "q1", to: "q0", label: "0 → R", side: "arc", dy: 36 },
              { from: "q1", to: "qa", label: "1 → R" },
            ]}
          />
        </Proof>
        <Proof title="0ⁿ1ⁿ, n > 0">
          <Machine
            caption="q0 crosses a 0; q1 scans to the last unmarked 1; q2/q3 rewind; leftover x’s then blank → accept. n = 0 rejected because q0 sees blank."
            w={680}
            h={200}
            nodes={[
              { id: "q0", x: 70, y: 110, label: "q0", start: true },
              { id: "q1", x: 220, y: 110, label: "q1" },
              { id: "q2", x: 380, y: 110, label: "q2" },
              { id: "q3", x: 530, y: 110, label: "q3" },
              { id: "qa", x: 400, y: 30, label: "acc", accept: true },
            ]}
            edges={[
              { from: "q0", to: "q1", label: "0 → x, R" },
              { from: "q1", to: "q1", label: "0,1 → R", side: "loop" },
              { from: "q1", to: "q2", label: "x,⊔ → L" },
              { from: "q2", to: "q3", label: "1 → x, L" },
              { from: "q3", to: "q3", label: "0,1 → L", side: "loop" },
              { from: "q3", to: "q0", label: "x → R", side: "arc", dy: 40 },
              { from: "q0", to: "qa", label: "x → R" },
            ]}
          />
        </Proof>
        <Proof title="Equal number of 0s and 1s">
          <P>
            Repeatedly: find the leftmost unmarked 0 or 1, mark it, scan for a matching opposite
            symbol, mark it, rewind to the first unmarked cell. If a sweep finds only marks and
            blanks, accept. If a sweep finds only one kind, reject.
          </P>
        </Proof>
        <Proof title="Palindrome / wwᴿ / w#w">
          <P>
            Remember the leftmost unmarked symbol in the state, run to the rightmost unmarked,
            check equality, mark both, repeat. For w#w the # is a fence: match position i on the
            left with position i on the right.
          </P>
        </Proof>
        <Proof title="Every 1 is followed by at least one 0">
          <P>
            Scan R. On 0 stay. On 1 go to a “need a 0” state; the next symbol must be 0 (else
            reject, including blank). After a 0, return to start. Blank in the start state accepts
            (ε and strings of only 0s are in the language).
          </P>
        </Proof>
      </Section>

      <Section id="closure" title="Closure of decidable languages under intersection">
        <Proof title="Decidable languages are closed under ∩">
          <P>Let M₁ decide L₁ and M₂ decide L₂. Build M:</P>
          <Grammar
            lines={[
              "M = “On input w:",
              "  1. Run M₁ on w. If it rejects, reject.",
              "  2. Run M₂ on w. If it rejects, reject.",
              "  3. Accept.”",
            ]}
          />
          <P>
            Both machines are deciders, so each run finishes. M accepts iff w ∈ L₁ ∩ L₂. The same
            skeleton works for union (accept if either accepts) and complement (swap accept/reject).
          </P>
        </Proof>
        <Callout kind="ok" title="Recognizable vs decidable closure">
          <P>
            Both closed under ∪, ∩, concat, star. Decidable is also closed under complement.
            Recognizable is not: if it were, A_TM and its complement would both be recognizable,
            hence decidable.
          </P>
        </Callout>
      </Section>

      <Section id="traps" title="Traps">
        <Table
          head={["Trap", "Fix"]}
          rows={[
            ["Drawing q_rej", "Omit it. Missing arrows reject."],
            ["Writing x → y R without the comma", "Course style: x → y, R."],
            ["Configuration: saying ‘head is on q’", "Head is on the first symbol of v in uqv."],
            ["Using a recognizer sequentially for intersection of RE", "Deciders: sequential is fine. Recognizers: dovetail / run in parallel."],
            ["Accepting 0ⁿ1ⁿ for n = 0 when the question says n > 0", "Read the quantifier. Blank at start rejects if n > 0."],
          ]}
        />
      </Section>
    </div>
  );
}
