import { Callout, Deriv, Grammar, M, P, Proof, Section, Table } from "@/components/blocks";
import { ParseTree } from "@/components/diagrams";

export function CfgNotes() {
  return (
    <div className="space-y-12">
      <Section id="idea" kicker="CO3 · 10–15 marks" title="A CFG is a recursive recipe for strings">
        <P>
          A context-free grammar is <M>G = (V, Σ, R, S)</M>: variables, terminals, productions,
          start variable. Each production replaces one variable, anywhere, by a string of variables
          and terminals. The language is every terminal string derivable from S.
        </P>
        <P>
          Regular languages remember one finite-state fact. CFGs remember <em>one unbounded
          counter-pair</em> (a nested match). That is why <M>{"{0ⁿ1ⁿ}"}</M> is context-free and{" "}
          <M>{"{0ⁿ1ⁿ2ⁿ}"}</M> is not.
        </P>
      </Section>

      <Section id="patterns" title="Design patterns — write these from memory">
        <Table
          head={["Language", "CFG"]}
          rows={[
            ["0ⁿ1ⁿ, n ≥ 0", "S → 0S1 | ε"],
            ["Palindromes over {0,1}", "S → 0S0 | 1S1 | 0 | 1 | ε"],
            ["Even-length palindromes", "S → 0S0 | 1S1 | ε"],
            ["Even number of 0s", "S → 1S | 0T | ε     T → 0S | 1T"],
            ["Even 0s and even 1s", "S → 0X | 1Y | ε    X → 0S | 1Z    Y → 1S | 0Z    Z → 0Y | 1X"],
            ["Every 2nd letter is a", "S → aaS | baS | a | b | ε"],
            ["More b’s than a’s", "S → TbT     T → TT | aTb | bTa | b | ε"],
            ["aⁱbʲcᵏ, i = j or i = k", "S → AC | A′     A → aAb | ε    C → cC | ε    A′ → aBc | B    B → bB | ε"],
            ["aⁱbʲcᵏ, j > i + k", "S → ABC    A → aAb | ε    B → bB | b    C → bCc | ε"],
            ["At least three 1s", "S → R1R1R1R     R → 0R | 1R | ε"],
            ["Starts and ends the same", "S → 0E0 | 1E1 | 0 | 1    E → 0E | 1E | ε"],
            ["Odd length, middle 0", "S → 0S0 | 0S1 | 1S0 | 1S1 | 0"],
            ["Not a palindrome", "S → 0S0 | 1S1 | 0T1 | 1T0     T → 0T0 | 0T1 | 1T0 | 1T1 | 0 | 1 | ε"],
          ]}
        />
        <Callout kind="tip" title="How to invent a CFG in 90 seconds">
          <P>
            1. Split the language into independently nested pieces (union = two start productions).
            2. Pair the symbols you must count together: <M>X → aXb</M>. 3. Dump unbounded junk
            into a regular nonterminal <M>R → 0R | 1R | ε</M>. 4. Test ε, a shortest string, and
            one string that should be rejected.
          </P>
        </Callout>
      </Section>

      <Section id="derive" title="Leftmost derivations and parse trees">
        <P>
          A leftmost derivation always expands the leftmost remaining variable. A parse tree has the
          start variable at the root, productions as internal nodes, terminals as leaves. Reading
          leaves left-to-right recovers the string.
        </P>
        <P>
          Exam move: write the derivation as a numbered list, then draw the tree that matches{" "}
          <em>that</em> derivation — not a different one.
        </P>
        <Grammar
          title="Running example"
          lines={["S → 0S1 | A", "A → #", "string: 000#111"]}
        />
        <Deriv
          steps={["S", "0S1", "00S11", "000S111", "000A111", "000#111"]}
        />
        <ParseTree
          caption="Parse tree for 000#111 — one child per symbol of the production."
          tree={{
            label: "S",
            kids: [
              { label: "0" },
              {
                label: "S",
                kids: [
                  { label: "0" },
                  {
                    label: "S",
                    kids: [
                      { label: "0" },
                      { label: "S", kids: [{ label: "A", kids: [{ label: "#" }] }] },
                      { label: "1" },
                    ],
                  },
                  { label: "1" },
                ],
              },
              { label: "1" },
            ],
          }}
        />
      </Section>

      <Section id="ambig" title="Ambiguity — how the 4-mark part is marked">
        <P>
          G is ambiguous if some string has two different parse trees (equivalently, two different
          leftmost derivations). To <em>show</em> ambiguity on the paper:
        </P>
        <ol className="ml-5 list-decimal space-y-1">
          <li>Keep the tree you already drew for part (b).</li>
          <li>Draw two more trees for the <em>same</em> string, structurally different.</li>
          <li>
            Optional: write the two extra leftmost derivations so the examiner can match trees to
            derivations.
          </li>
        </ol>
        <P>
          For “two strings of length 4 with exactly one parse tree”: brute-force all length-4
          strings, count trees. Strings that use a production in only one geometric way (often a
          unique position for a distinguished terminal) are the unique ones.
        </P>
      </Section>

      <Section id="exam" title="Exam grammars, fully solved">
        <Proof title="Paper: palindromes, every 2nd letter a, more b than a">
          <P>
            <M>L₁</M> palindromes, <M>L₂</M> every second letter is a, <M>L₃</M> more b than a,{" "}
            <M>L₄ = L₁ ∩ L₂</M>, <M>L₅ = L₂ ∩ L₃</M>.
          </P>
          <P>(a) Complement of palindromes — force one mismatch, recurse on the rest:</P>
          <Grammar
            lines={[
              "S → 0S0 | 1S1 | 0T1 | 1T0",
              "T → 0T0 | 0T1 | 1T0 | 1T1 | 0 | 1 | ε",
            ]}
          />
          <P>(b) Every second letter is a. Pair the input as (first free, second forced a), leftover at most one symbol:</P>
          <Grammar lines={["S → aaS | baS | a | b | ε"]} />
          <P>(c) Strictly more b’s than a’s. T generates #b ≥ #a; wrap an extra b:</P>
          <Grammar lines={["S → TbT", "T → TT | aTb | bTa | b | ε"]} />
          <P>
            (d) Five-letter strings in L₄. Length 5 palindromes with positions 2 and 4 equal to a:
            form <M>xaya x</M>. The four strings are <M>aaaaa, aabaa, baaab, babab</M>.
          </P>
          <P>
            (e) CFG for L₄. Even-length members are only <M>a^{"{even}"}</M> (every even position is a
            and palindrome forces the rest). Odd members are built from the centre, alternating a
            free odd-position pair with a forced <M>a _ a</M> even-position pair:
          </P>
          <Grammar
            lines={[
              "S  → E | O1 | O3",
              "E  → aaE | ε",
              "O1 → aTa | bTb | a | b          (length 1 mod 4)",
              "T  → a O1 a",
              "O3 → aUa | bUb                  (length 3 mod 4)",
              "U  → a O3 a | a",
            ]}
          />
          <P>
            (f) CFG for L₅. Even length is impossible (too many forced a’s). Odd length works only
            if every free (odd) position is b: the language is <M>(ba)*b</M>.
          </P>
          <Grammar lines={["S → baS | b"]} />
          <P>
            (g) <M>|L₅ ∖ L₁|</M>. Every string <M>(ba)ⁿb</M> is a palindrome, so the difference is
            empty. Answer: <strong>0</strong>.
          </P>
        </Proof>

        <Proof title="Leftmost derivation for 01101010  with  S → P0Q">
          <Grammar
            lines={[
              "S → P 0 Q",
              "P → 0P0 | 0P1 | 1P0 | 1P1 | 0 | 1",
              "Q → 0Q0 | 1Q0 | ε",
            ]}
          />
          <P>
            P generates a single centre bit with matching-length (not necessarily matching-symbol)
            wings; then a literal 0; then Q generates a (possibly empty) even-looking tail that
            always ends by producing 0s on the right of a centre that may be ε. One valid leftmost
            derivation of <M>01101010</M>:
          </P>
          <Deriv
            steps={[
              "S",
              "P0Q",
              "0P10Q",
              "01P010Q",
              "011010Q",
              "011010 0Q0",
              "01101010",
            ]}
          />
          <P>
            The same string has other trees: the centre 0 of S can sit in different positions
            (index 2, 4, or 6), each giving a different split between P and Q — that is the
            ambiguity. Length-4 strings with a unique tree are those whose only possible centre-0
            of the S-production sits in one place, e.g. <M>0100</M> and <M>1100</M> under this
            grammar (verify by enumerating the three slots for the distinguished 0).
          </P>
        </Proof>

        <Proof title="Grammar S → PaQ, string abbaabab">
          <Grammar
            lines={[
              "S → P a Q",
              "P → aPa | aPb | bPa | bPb | ε",
              "Q → aQ | bQ | ε",
            ]}
          />
          <P>
            P is an even-length “any palindrome-shaped wing” (actually any even string: each
            production writes a pair around P). The distinguished <M>a</M> is a centre marker, Q
            is Σ*. Leftmost derivation of <M>abbaabab</M>:
          </P>
          <Deriv
            steps={[
              "S",
              "PaQ",
              "aPbaQ",
              "abPabaQ",
              "abbaabaQ",
              "abbaababQ",
              "abbaabab",
            ]}
          />
          <P>
            Ambiguity: the distinguished a of S can be any of the a’s in the string (positions 1, 4,
            5, 7 in 1-based indexing), each giving a different tree. Unique length-4 strings are
            those with exactly one a, e.g. <M>bbba</M> and <M>bbab</M> — only one place to put the
            S-production’s a.
          </P>
        </Proof>
      </Section>

      <Section id="traps" title="Traps">
        <Table
          head={["Trap", "Fix"]}
          rows={[
            ["Writing a regular expression and calling it a CFG", "Productions only. S → …"],
            ["Forgetting ε when the language contains it", "Check empty, length 1, length 2."],
            ["Ambiguity shown with two rightmost derivations of different strings", "Same string, two leftmost derivations / two trees."],
            ["Intersection of two CFLs assumed CFL", "CFL not closed under ∩. Sometimes the intersection still is CFL — you must build the grammar."],
            ["Complement of a CFL assumed non-CFL", "The class is not closed; a particular complement (non-palindromes) is CFL."],
          ]}
        />
      </Section>
    </div>
  );
}
