import { Grammar, M, P, Section, Table } from "@/components/blocks";

export function CheatsheetBody() {
  return (
    <div className="space-y-12">
      <Section kicker="One page in your head" title="Hierarchy and closure">
        <P>
          Regular ⊂ CFL ⊂ decidable ⊂ recognizable ⊂ all languages. Each ⊂ is proper. Finite ⊂
          regular.
        </P>
        <Table
          head={["", "Regular", "CFL", "Decidable", "Recognizable"]}
          rows={[
            ["Union", "yes", "yes", "yes", "yes"],
            ["Concat / star", "yes", "yes", "yes", "yes"],
            ["Intersection", "yes", "no", "yes", "yes"],
            ["Complement", "yes", "no", "yes", "no"],
          ]}
        />
      </Section>

      <Section title="Pumping — the three conditions">
        <Grammar
          lines={[
            "s = xyz,  |s| ≥ p",
            "xyⁱz ∈ L  for all i ≥ 0",
            "|y| > 0",
            "|xy| ≤ p     ← forces y into the first block",
          ]}
        />
      </Section>

      <Section title="CFG templates">
        <Grammar
          lines={[
            "0ⁿ1ⁿ                 S → 0S1 | ε",
            "palindrome           S → 0S0 | 1S1 | 0 | 1 | ε",
            "even palindrome      S → 0S0 | 1S1 | ε",
            "every 2nd is a       S → aaS | baS | a | b | ε",
            "more b than a        S → TbT ;  T → TT | aTb | bTa | b | ε",
            "not palindrome       S → 0S0 | 1S1 | 0T1 | 1T0",
            "                     T → 0T0 | 0T1 | 1T0 | 1T1 | 0 | 1 | ε",
            "aⁱbʲcᵏ, j > i+k      S → ABC",
            "                     A → aAb | ε ;  B → bB | b ;  C → bCc | ε",
          ]}
        />
      </Section>

      <Section title="PDA / TM labels">
        <P>
          PDA: <M>a, b → c</M> = read a, pop b, push c. TM: <M>x → y, R</M> = read x, write y,
          move right. Configuration <M>u q v</M> = tape uv, head on first of v.
        </P>
      </Section>

      <Section title="Decidable vs not">
        <Table
          head={["Language", "Status", "Why"]}
          rows={[
            ["A_DFA, A_NFA, A_REX", "decidable", "Simulate / convert, finite."],
            ["E_DFA", "decidable", "Reachability of an accept state."],
            ["A_CFG (membership)", "decidable", "CYK / convert to Chomsky NF."],
            ["A_TM, HALT_TM", "RE, not decidable", "Universal TM recognizes; diagonalisation."],
            ["E_TM, EQ_TM", "not even RE", "Reduce from A_TM / complement."],
            ["Ā_TM", "not RE", "A_TM RE + not decidable."],
          ]}
        />
      </Section>

      <Section title="Reduction compass">
        <P>
          Easy: A ≤ known-easy. Hard: known-hard ≤ C. M′ template: on input x, ignore x, run M on
          w, accept (everything) iff the hidden bit is yes; otherwise accept nothing.
        </P>
      </Section>
    </div>
  );
}
