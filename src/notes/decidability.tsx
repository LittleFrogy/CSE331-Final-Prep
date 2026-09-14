import { Callout, Grammar, P, Proof, Section, Table } from "@/components/blocks";

export function DecidabilityNotes() {
  return (
    <div className="space-y-12">
      <Section id="idea" kicker="CO4" title="Decidable means there is a TM that always answers">
        <P>
          A language is decidable (recursive) if some TM halts on every input and accepts exactly
          the strings in the language. To prove decidability you exhibit the decider and argue two
          things: (1) it always halts, (2) the answer is correct.
        </P>
        <P>
          Finite objects are the friend: a DFA, an NFA, a regular expression, a CFG. You can
          simulate them to completion. A TM is not a finite object in the same way — simulating it
          may never return.
        </P>
      </Section>

      <Section id="method" title="The two-question habit">
        <P>Every decidability proof on this course is the same shape:</P>
        <ol className="ml-5 list-decimal space-y-1">
          <li>Write the machine as a numbered algorithm on ⟨encoding⟩.</li>
          <li>Halt: each step is a finite procedure (subset construction, reachability, |w| steps of a DFA).</li>
          <li>Correct: the conversion preserves the language, so the answer of the subroutine is the answer of the original.</li>
        </ol>
      </Section>

      <Section id="worked" title="The standard languages">
        <Proof title="A_DFA = { ⟨D, w⟩ | DFA D accepts w }">
          <Grammar
            lines={[
              "M_DFA = “On input ⟨D, w⟩:",
              "  1. Check the encoding is a DFA and a string; else reject.",
              "  2. Simulate D on w.",
              "  3. Accept iff the run ends in an accept state.”",
            ]}
          />
          <P>A DFA consumes one symbol per step, so the simulation ends after |w| steps.</P>
        </Proof>
        <Proof title="A_NFA and A_REX, by reduction to A_DFA">
          <P>
            A_NFA: convert N to a DFA by subset construction (≤ 2^{"{|Q|}"} states, finite), then run
            M_DFA. A_REX: convert R to an NFA by Thompson’s construction, then run the A_NFA
            decider. Both conversions terminate and preserve the language.
          </P>
        </Proof>
        <Proof title="E_DFA = { ⟨D⟩ | L(D) = ∅ }">
          <Grammar
            lines={[
              "T = “On input ⟨D⟩:",
              "  1. Mark the start state.",
              "  2. Repeat: mark every state with an edge from a marked state.",
              "  3. Accept if no accept state is marked; else reject.”",
            ]}
          />
          <P>
            L(D) is empty iff no accept state is reachable. Finite graph, so the marking halts.
          </P>
        </Proof>
      </Section>

      <Section id="exam" title="Exam proof: ‘every accepted string has a 1’">
        <Proof title="L = { ⟨D⟩ | D is a DFA, and if D accepts w then w contains at least one 1 }">
          <P>
            Restate: L(D) ⊆ (0+1)*1(0+1)* ∪ 1(0+1)* — equivalently, D accepts no string in 0*
            (including ε). So L is the set of DFAs with L(D) ∩ 0* = ∅.
          </P>
          <Grammar
            lines={[
              "M = “On input ⟨D⟩:",
              "  1. Build a DFA E for 0*.",
              "  2. Build the product DFA P for L(D) ∩ L(E).",
              "  3. Run the E_DFA decider on ⟨P⟩.",
              "  4. Accept iff that decider accepts (the intersection is empty).”",
            ]}
          />
          <P>
            All steps finite. Correct because the condition is exactly emptiness of the
            intersection with 0*.
          </P>
        </Proof>
        <Callout kind="exam" title="A_TM is the other direction">
          <P>
            A_TM is recognizable (universal TM) and undecidable (from HALT, or by its own
            diagonalisation). Do not “simulate M on w and reject if it loops” — you cannot detect
            the loop.
          </P>
        </Callout>
      </Section>

      <Section id="tf" title="True / False (write the correction)">
        <Table
          head={["Claim", "Verdict"]}
          rows={[
            ["Regular ⊂ CFL ⊂ recognizable ⊂ decidable", "False. Regular ⊂ CFL ⊂ decidable ⊂ recognizable."],
            ["For recognizable languages the TM halts on every input", "False. That is decidable."],
            ["PDAs recognize every regular and every non-regular language", "False. Only CFLs. {aⁿbⁿcⁿ} is not CFL."],
            ["Some non-regular languages satisfy the pumping lemma", "True. Necessary ≠ sufficient."],
            ["A CFG for a regular language cannot be ambiguous", "False. S → SS | a | ε generates a* and is ambiguous."],
          ]}
        />
      </Section>

      <Section id="traps" title="Traps">
        <Table
          head={["Trap", "Fix"]}
          rows={[
            ["Simulating a TM and claiming the simulator decides", "Simulation of a TM is only a recognizer."],
            ["Forgetting to argue termination", "Name the finite bound: |w|, 2^|Q|, |Q| marking rounds."],
            ["Encoding: skipping the ‘reject if malformed’ line", "⟨O⟩ always includes a validity check."],
            ["Mixing up E_DFA (empty language) with E_TM", "E_TM is undecidable. E_DFA is a graph reachability check."],
          ]}
        />
      </Section>
    </div>
  );
}
