import { Callout, Grammar, P, Proof, Section, Table } from "@/components/blocks";

export function HaltNotes() {
  return (
    <div className="space-y-12">
      <Section id="idea" kicker="CO4 · bonus 5" title="Some questions have no algorithm">
        <P>
          The halting problem: given a program and an input, does the program eventually stop?
          Turing proved in 1936 that no TM decides this for all TMs. The language is
        </P>
        <Grammar lines={["HALT_TM  =  { ⟨M, w⟩ | M is a TM and M halts on w }"]} />
        <P>
          It is recognizable (simulate M on w; if it ever stops, accept) but not decidable. That
          gap — recognizable minus decidable — is the whole point of the chapter.
        </P>
      </Section>

      <Section id="proof" title="Diagonalisation proof (write this from memory)">
        <Proof title="HALT_TM is undecidable">
          <P>Assume, for contradiction, that H decides HALT_TM:</P>
          <Grammar
            lines={[
              "H = “On input ⟨M, w⟩:",
              "  1. Simulate M on w.",
              "  2. If M halts, accept; if M loops, reject.”",
            ]}
          />
          <P>
            (A real decider cannot “see” a loop; that is already the bug in the assumption. We
            proceed formally.) Build a diagonal machine D that uses H as a subroutine and does the
            opposite of what M does on its own description:
          </P>
          <Grammar
            lines={[
              "D = “On input ⟨M⟩:",
              "  1. Run H on ⟨M, ⟨M⟩⟩.",
              "  2. If H rejects, halt.",
              "  3. If H accepts, loop forever.”",
            ]}
          />
          <P>So D(⟨M⟩) halts iff M loops on ⟨M⟩. Run D on its own description:</P>
          <Grammar
            lines={[
              "D(⟨D⟩) halts    iff  D loops on ⟨D⟩",
              "D(⟨D⟩) loops    iff  D halts on ⟨D⟩",
            ]}
          />
          <P>
            Contradiction. H does not exist. HALT_TM is undecidable.
          </P>
        </Proof>
        <Callout kind="tip" title="Why this is called diagonalisation">
          <P>
            Imagine a table with machines on rows and inputs ⟨Mⱼ⟩ on columns. H would fill in halt /
            loop. D is built to disagree with the diagonal: D on ⟨D⟩ cannot consistently be halt or
            loop. Same shape as Cantor’s uncountability proof.
          </P>
        </Callout>
      </Section>

      <Section id="atm" title="A_TM, the universal machine, and the three outcomes">
        <Grammar
          lines={[
            "A_TM = { ⟨M, w⟩ | M is a TM that accepts w }",
            "",
            "U = “On input ⟨M, w⟩:",
            "  1. Simulate M on w.",
            "  2. If M accepts, accept; if M rejects, reject.”",
          ]}
        />
        <P>
          U is a universal TM — an interpreter. It recognizes A_TM. It does not decide A_TM,
          because if M loops on w, U loops too. A_TM is the canonical recognizable-but-undecidable
          language. HALT_TM is also recognizable-but-undecidable.
        </P>
        <Table
          head={["On input w", "Decider", "Recognizer"]}
          rows={[
            ["w ∈ L", "halt, accept", "halt, accept"],
            ["w ∉ L", "halt, reject", "halt-reject, or loop"],
          ]}
        />
      </Section>

      <Section id="complement" title="RE is not closed under complement (exam bonus)">
        <Proof title="From HALT_TM undecidable to ‘RE not closed under complement’">
          <P>
            HALT_TM is recognizable (simulate until halt). Suppose the recognizable languages were
            closed under complement. Then the complement of HALT_TM would be recognizable too. A
            language and its complement both recognizable ⇒ the language is decidable: run both
            recognizers in parallel (dovetail); one of them must accept. That would decide
            HALT_TM, which is impossible. Therefore RE is not closed under complement.
          </P>
        </Proof>
        <P>
          Equivalent slogan: A_TM is RE, not decidable, so Ā_TM is not even RE. The complement of
          a recognizable-but-undecidable language is not recognizable.
        </P>
      </Section>

      <Section id="traps" title="Traps">
        <Table
          head={["Trap", "Fix"]}
          rows={[
            ["‘HALT is undecidable because it might loop’", "That is the question, not the proof. Use D versus D."],
            ["Confusing A_TM with HALT_TM", "A_TM = accepts. HALT_TM = accepts or rejects (does not loop)."],
            ["Saying U decides A_TM", "U recognizes. Simulation of a looper loops."],
            ["Proving RE not closed under complement without a witness", "Name HALT_TM or A_TM. They are RE and not co-RE."],
          ]}
        />
      </Section>
    </div>
  );
}
