import { Callout, M, P, Proof, Section, Table } from "@/components/blocks";

export function ReducibilityNotes() {
  return (
    <div className="space-y-12">
      <Section id="idea" kicker="CO4" title="Solve A by converting it into B">
        <P>
          The lcm/gcd story from lecture: you compute lcm(a, b) by computing gcd first and
          rearranging. A reduces to B, written <M>A ≤ B</M>, means A is no harder than B: a
          solution for B yields a solution for A.
        </P>
        <P>
          Computationally: a computable function f turns instances of A into instances of B so
          that the answer is preserved. Run the B-algorithm on f(x) and read off the A-answer.
        </P>
      </Section>

      <Section id="direction" title="Direction is the whole subject">
        <Callout kind="trap" title="The arrow points toward the thing you already understand">
          <P>
            Want to prove A is easy? Reduce A to a known easy problem (A ≤ easy). Want to prove C
            is hard? Reduce a known hard problem to C (hard ≤ C). Reducing C to a hard problem
            proves nothing — easy problems also reduce to hard ones.
          </P>
        </Callout>
        <Table
          head={["Goal", "Reduction", "Why"]}
          rows={[
            ["A is decidable", "A ≤ (known decidable)", "Compose with the known decider."],
            ["C is undecidable", "(known undecidable) ≤ C", "A decider for C would decide the known-undecidable."],
            ["C is not recognizable", "(known non-RE) ≤ C", "Same, for recognizers."],
          ]}
        />
      </Section>

      <Section id="decidable" title="Proving decidable — the easy direction">
        <P>
          A_NFA ≤ A_DFA by subset construction. A_REX ≤ A_NFA by Thompson. The conversion itself
          must halt, and must preserve membership. That is the entire proof; do not re-simulate
          the DFA from scratch unless you want to.
        </P>
      </Section>

      <Section id="undecidable" title="Proving undecidable — map the known hard problem in">
        <Proof title="A_TM is undecidable, from HALT_TM">
          <P>
            We show HALT_TM ≤ A_TM. Given ⟨M, w⟩ (a halting-question), build M′ that on every
            input x runs M on w and then accepts. So L(M′) = Σ* if M halts on w, and L(M′) = ∅
            otherwise. Feed ⟨M′, a⟩ to an assumed A_TM-decider R. R accepts iff M′ accepts a iff
            M halts on w. That decides HALT_TM, impossible. Hence A_TM is undecidable.
          </P>
        </Proof>
        <Proof title="E_TM = { ⟨M⟩ | L(M) = ∅ } is undecidable, from A_TM">
          <P>
            Given ⟨M, w⟩, build M′ that ignores x, runs M on w, and accepts x iff M accepts w.
            Then L(M′) = ∅ iff M does not accept w. An E_TM-decider on ⟨M′⟩ would decide A_TM
            (flip the answer). Impossible.
          </P>
        </Proof>
        <Callout kind="tip" title="The M′ template">
          <P>
            Almost every exam reduction builds a machine M′ whose language is either “everything”
            or “nothing”, with the choice encoding the hidden yes/no of the source instance. Then
            one query to the unknown decider (emptiness, infiniteness, acceptance of ε, …) reads
            the bit back.
          </P>
        </Callout>
      </Section>

      <Section id="exam" title="Exam: recognizable languages are not closed under complement">
        <Proof title="Using HALT_TM">
          <P>HALT_TM is recognizable and undecidable. If RE were closed under complement then</P>
          <ol className="ml-5 list-decimal space-y-1">
            <li>complement(HALT_TM) would be recognizable;</li>
            <li>
              HALT_TM and its complement both recognizable ⇒ HALT_TM decidable (run both
              recognizers in parallel; one accepts);
            </li>
            <li>contradiction.</li>
          </ol>
          <P>
            So RE is not closed under complement. The same argument with A_TM shows Ā_TM is not
            recognizable.
          </P>
        </Proof>
      </Section>

      <Section id="traps" title="Traps">
        <Table
          head={["Trap", "Fix"]}
          rows={[
            ["Reducing the unknown to the known-undecidable", "Wrong way. Known-hard ≤ unknown."],
            ["Forgetting to flip the answer for E_TM", "Empty iff M does not accept — the E_TM-decider’s accept is the A_TM reject."],
            ["Building M′ that still depends on x in a useful way", "x is a dummy. M′’s language is Σ* or ∅."],
            ["Claiming a reduction ‘runs M on w until it loops’", "You cannot wait for a loop. M′ simply simulates; if M loops, M′ loops."],
          ]}
        />
      </Section>
    </div>
  );
}
