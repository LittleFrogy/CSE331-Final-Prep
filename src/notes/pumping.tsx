import { Callout, Grammar, M, P, Proof, Section, Steps, Table } from "@/components/blocks";

export function PumpingNotes() {
  return (
    <div className="space-y-12">
      <Section id="idea" kicker="CO5 · 5 marks" title="What the pumping lemma is actually saying">
        <P>
          A DFA has finitely many states. If it reads a long string, some state must repeat (pigeonhole).
          The chunk of input between those two visits of the same state can be replayed any number of
          times, and the machine still ends in the same state. That chunk is the “pump”.
        </P>
        <P>
          Every regular language has this pumping property. So if you exhibit one string in{" "}
          <M>L</M> that cannot be pumped, <M>L</M> is not regular. The lemma is a{" "}
          <em>necessary</em> condition, not a characterisation — some non-regular languages still pump.
        </P>
        <Callout kind="exam" title="This is always the 5-mark opener">
          <P>
            Summer papers give one language of the form <M>0ⁿ1ᵐ</M> or <M>0ⁱ1ʲ2ᵏ</M> with a numeric
            side-condition. Write the six-step proof. Do not skip “|xy| ≤ p forces y into the first
            block”.
          </P>
        </Callout>
      </Section>

      <Section id="statement" title="Formal statement (Sipser 1.70)">
        <P>
          If <M>A</M> is regular, there exists a pumping length <M>p ≥ 1</M> such that every{" "}
          <M>s ∈ A</M> with <M>|s| ≥ p</M> can be split <M>s = xyz</M> with:
        </P>
        <ol className="ml-5 list-decimal space-y-1">
          <li>
            <M>xyⁱz ∈ A</M> for every <M>i ≥ 0</M> (including pumping down, <M>i = 0</M>)
          </li>
          <li>
            <M>|y| {">"} 0</M> (the pump is nonempty)
          </li>
          <li>
            <M>|xy| ≤ p</M> (the pump sits in the first <M>p</M> symbols)
          </li>
        </ol>
        <P>
          Condition 3 is the one that wins marks. Without it, an adversary could put <M>y</M> across
          the interesting boundary of your string.
        </P>
      </Section>

      <Section id="method" title="The six-step exam method">
        <Steps
          items={[
            {
              n: "01",
              t: "Assume, for contradiction, that L is regular.",
              d: "Then the pumping lemma hands you some p. You do not get to pick p — the enemy does.",
            },
            {
              n: "02",
              t: "Choose a specific s ∈ L with |s| ≥ p.",
              d: "s must display the ‘essence’ of L. For equal counts, use 0ᵖ1ᵖ, not (01)ᵖ.",
            },
            {
              n: "03",
              t: "Write s = xyz with the three conditions.",
              d: "You do not choose the split. You argue about every split that |xy| ≤ p allows.",
            },
            {
              n: "04",
              t: "Use |xy| ≤ p to locate y.",
              d: "If s starts with p (or more) 0s, y is made only of 0s. This kills mixed-y cases.",
            },
            {
              n: "05",
              t: "Pick an i (usually 2 or 0) so that xyⁱz ∉ L.",
              d: "Pump up to break equality; pump down when the language is a strict inequality.",
            },
            {
              n: "06",
              t: "Contradiction. Therefore L is not regular.",
              d: "One sentence. Do not add a DFA ‘intuition’ paragraph — the proof is the pumping.",
            },
          ]}
        />
      </Section>

      <Section id="worked" title="Worked proofs you must be able to write cold">
        <Proof title="B = {0ⁿ1ⁿ | n ≥ 0}">
          <P>
            Assume B is regular; let p be the pumping length. Take <M>s = 0ᵖ1ᵖ ∈ B</M>,{" "}
            <M>|s| = 2p ≥ p</M>. Write <M>s = xyz</M> with <M>|y| {">"} 0</M> and <M>|xy| ≤ p</M>.
            Then <M>xy</M> lies inside the 0-block, so <M>y = 0ᵏ</M> for some <M>k ≥ 1</M>. Pump
            up: <M>xy²z = 0ᵖ⁺ᵏ1ᵖ</M>, which has more 0s than 1s, so <M>∉ B</M>. Contradiction.
          </P>
        </Proof>
        <Proof title="C = { w ∈ {0,1}* | #0(w) = #1(w) }">
          <P>
            Same <M>s = 0ᵖ1ᵖ</M>. Condition 3 is essential: without it an adversary could take{" "}
            <M>y = 0ᵖ1ᵖ</M> and pumping would stay balanced. With <M>|xy| ≤ p</M>, y is only 0s,
            and <M>xy²z</M> is unbalanced. (Do not pick <M>s = (01)ᵖ</M> — that string pumps with{" "}
            <M>y = 01</M>.)
          </P>
          <P>
            Alternative: if C were regular then <M>C ∩ 0*1* = {"{0ⁿ1ⁿ}"}</M> would be regular, but it
            is not.
          </P>
        </Proof>
        <Proof title="D = { 1^{n²} | n ≥ 0 }  (unary perfect squares)">
          <P>
            Take <M>s = 1^{"{p²}"}</M>. Then <M>1 ≤ |y| ≤ p</M>, so
          </P>
          <Grammar lines={["p²  <  |xy²z|  ≤  p² + p  <  p² + 2p + 1  =  (p+1)²"]} />
          <P>
            Length of <M>xy²z</M> sits strictly between consecutive squares, so it is not a square.
            Hence <M>xy²z ∉ D</M>.
          </P>
        </Proof>
        <Proof title="E = { 0ⁱ1ʲ | i > j }  — pump down">
          <P>
            Take <M>s = 0^{"{p+1}"}1ᵖ</M>. Then y is only 0s. Pumping up still has more 0s than 1s, so
            stays in E — no contradiction. Pump <em>down</em>: <M>xy⁰z = xz</M> has at most p zeros
            and p ones, so <M>i ≤ j</M>, hence <M>∉ E</M>.
          </P>
        </Proof>
        <Proof title="F = { ww | w ∈ {0,1}* }">
          <P>
            Take <M>s = 0ᵖ10ᵖ1</M> (not <M>0ᵖ0ᵖ</M>, which pumps). |xy| ≤ p puts y in the first
            0-block. Pumping yields <M>0^{"{p+|y|}"}10ᵖ1</M>, which is not of the form ww.
          </P>
        </Proof>
      </Section>

      <Section id="exam" title="Exam languages (Summer-style)">
        <Proof title="L = { 0ⁿ1ᵐ | n = 4q + r₁, m = 4q + r₂, q ≥ 0, 0 ≤ r₁, r₂ ≤ 3 }">
          <P>
            In words: <M>⌊n/4⌋ = ⌊m/4⌋</M>. The two blocks live in the same size-4 window.
          </P>
          <P>
            Assume regular, pumping length p. Take <M>s = 0^{"{4p}"}1^{"{4p}"} ∈ L</M> (window q = p,
            remainders 0). Then y = 0ᵏ, k ≥ 1. Pump down:
          </P>
          <Grammar lines={["xy⁰z  =  0^{4p − k} 1^{4p}", "⌊(4p − k)/4⌋ = p − 1   since 1 ≤ k ≤ p ≤ 4p", "⌊4p/4⌋ = p"]} />
          <P>
            The floors differ, so <M>xy⁰z ∉ L</M>. Contradiction.
          </P>
        </Proof>
        <Proof title="L = { 0ⁱ1ʲ2ᵏ | i,j,k ≥ 0; if i = 1 then j = k, otherwise j ≠ k }">
          <P>
            Assume regular, pumping length p. Take <M>s = 01ᵖ2ᵖ ∈ L</M> (here i = 1 so we need
            j = k). |xy| ≤ p puts xy inside the prefix <M>01^{"{p−1}"}</M> at worst.
          </P>
          <ul className="ml-5 list-disc space-y-1">
            <li>
              If y contains the leading 0: pumping down removes it, giving <M>1ᵖ2ᵖ</M>. Now i = 0 ≠ 1,
              so membership requires j ≠ k, but j = k = p. Out of L.
            </li>
            <li>
              If y is only 1s: pumping down yields <M>01^{"{p−k}"}2ᵖ</M> with i still 1 and j ≠ k. Out of L.
            </li>
            <li>
              If y = 01ᵃ: pumping up produces two 0s with 1s between them, not in <M>0*1*2*</M>. Out of L.
            </li>
          </ul>
          <P>All cases fail. L is not regular.</P>
        </Proof>
        <Callout kind="tip" title="A language that pumps but is not regular">
          <P>
            <M>L = {"{ aⁱbʲcᵏ | if i = 1 then j = k }"}</M> (no “otherwise” clause). For any long
            string you can always find a pump: if i ≠ 1 pump an a (or a b if there is no a); if i = 1
            pump the single a, which moves i away from 1 and drops the j = k requirement. Yet{" "}
            <M>L ∩ ab*c* = {"{ abⁿcⁿ }"}</M> is not regular, so L is not regular. Pumping lemma is
            necessary, not sufficient. This is the T/F “some non-regular languages may satisfy PL”.
          </P>
        </Callout>
      </Section>

      <Section id="traps" title="Traps and mark-stealers">
        <Table
          head={["Trap", "Fix"]}
          rows={[
            ["Picking s that pumps, e.g. (01)ᵖ for equal 0s/1s", "Choose a string whose first p symbols are a single alphabet symbol."],
            ["Forgetting |xy| ≤ p", "Write it. Use it to locate y in one block."],
            ["Only pumping i = 2 when i = 0 is needed", "If adding symbols stays in L, delete them."],
            ["Claiming ‘DFA cannot count’ as the proof", "Intuition is fine in a sentence; the marks are the pumping argument."],
            ["Quantifier mix-up: you pick p", "The lemma gives p. You pick s (depending on p). You do not pick xyz."],
          ]}
        />
      </Section>
    </div>
  );
}
