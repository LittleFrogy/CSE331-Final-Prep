import { Callout, Grammar, M, P, Proof, Section, Steps, Table } from "@/components/blocks";
import { Machine } from "@/components/diagrams";

export function PdaNotes() {
  return (
    <div className="space-y-12">
      <Section id="idea" kicker="CO3 · 10 marks" title="A PDA is an NFA with a stack">
        <P>
          Finite control plus an infinite stack. You only ever see the top symbol. That is enough
          to match two unbounded quantities (push the first, pop the second) and not three.
        </P>
        <P>
          Formally a 6-tuple <M>(Q, Σ, Γ, δ, q₀, F)</M>. Transitions may read ε, pop ε, push ε.
          Acceptance is by final state (course default) after the input is consumed; empty-stack
          acceptance is equivalent in power.
        </P>
      </Section>

      <Section id="notation" title="How to read a, b → c">
        <Grammar
          title="Edge label"
          lines={[
            "a , b  →  c",
            "│   │      │",
            "│   │      └─ symbol pushed (ε = push nothing)",
            "│   └──────── symbol popped (must be stack top; ε = don’t pop)",
            "└──────────── input consumed (ε = don’t read)",
          ]}
        />
        <P>
          ε, ε → $ is “push the bottom-of-stack marker without reading”. ε, $ → ε is “pop the
          marker and accept”. A self-loop 0, ε → 0 means “read 0, push 0, stay”.
        </P>
      </Section>

      <Section id="method" title="Design method (write this in the margin first)">
        <Steps
          items={[
            {
              n: "01",
              t: "Identify the two things being counted.",
              d: "n vs n, n vs 2n, #1s in w1 vs #0s in w2, |w| vs |wᴿ|.",
            },
            {
              n: "02",
              t: "Push during the first region.",
              d: "One stack symbol per unit you will later match. For 0ⁿ1²ⁿ push two X’s per 0, or pop one X per two 1s.",
            },
            {
              n: "03",
              t: "Nondeterministically guess the boundary.",
              d: "ε, ε → ε from the push state to the pop state. Never wait for a symbol that might be absent.",
            },
            {
              n: "04",
              t: "Pop during the second region.",
              d: "Reject implicitly if the stack is empty too soon or leftover when input ends.",
            },
            {
              n: "05",
              t: "Pop $ into an accept state.",
              d: "ε, $ → ε. Draw the accept double-circle. Omit reject sinks.",
            },
          ]}
        />
      </Section>

      <Section id="worked" title="Worked machines">
        <Proof title="0ⁿ1ⁿ, n ≥ 0">
          <Machine
            caption="Push 0s, guess the middle, pop on 1s, pop $ to accept. n = 0 takes the ε-path straight to q2."
            w={640}
            h={170}
            nodes={[
              { id: "q0", x: 70, y: 90, label: "q0", start: true },
              { id: "q1", x: 220, y: 90, label: "q1" },
              { id: "q2", x: 400, y: 90, label: "q2" },
              { id: "q3", x: 560, y: 90, label: "q3", accept: true },
            ]}
            edges={[
              { from: "q0", to: "q1", label: "ε, ε → $" },
              { from: "q1", to: "q1", label: "0, ε → 0", side: "loop" },
              { from: "q1", to: "q2", label: "ε, ε → ε" },
              { from: "q2", to: "q2", label: "1, 0 → ε", side: "loop" },
              { from: "q2", to: "q3", label: "ε, $ → ε" },
            ]}
          />
        </Proof>
        <Proof title="wcwᴿ  (odd palindromes) and wwᴿ (even)">
          <P>
            Push everything until you guess the middle. For odd palindromes consume the centre with
            ε-pop; for even, skip the centre. Then pop matching symbols. Same skeleton as 0ⁿ1ⁿ with
            a 0/1 alphabet and two push-loops.
          </P>
        </Proof>
        <Proof title="0ⁿ1²ⁿ  /  0²ⁿ1ⁿ  /  0ⁿ1ⁿ⁺²">
          <Table
            head={["Language", "Trick"]}
            rows={[
              ["0ⁿ1²ⁿ", "Push two X per 0, or pop one X per two 1s (a two-state gadget on the pop side)."],
              ["0²ⁿ1ⁿ", "Push on every other 0 (state tracks parity of 0s), then pop on 1s."],
              ["0ⁿ1ⁿ⁺²", "Push n zeros, then force two extra 1s with two states before popping."],
              ["0ⁿ1ᵐ, m > n", "Pop all 0s, then demand at least one leftover 1."],
            ]}
          />
        </Proof>
      </Section>

      <Section id="exam" title="Exam PDAs (draw these)">
        <Proof title="L₁ = { w ∈ {0,1}+ | w starts with 1 and ends with 0 }  (or starts with 10)">
          <P>
            Regular — the stack is ornamental. You can still draw a PDA: push $, read the prefix
            10 (or 1…0), ignore the middle, accept on the last 0 after seeing the prefix, pop $.
          </P>
          <Machine
            caption="Starts with 10. Middle is free. Ends anywhere after the prefix — here we accept as soon as 10 is seen and then ignore the rest, or require end-of-input via $."
            w={700}
            h={170}
            nodes={[
              { id: "q0", x: 60, y: 90, label: "q0", start: true },
              { id: "q1", x: 200, y: 90, label: "q1" },
              { id: "q2", x: 360, y: 90, label: "q2" },
              { id: "q3", x: 520, y: 90, label: "q3" },
              { id: "q4", x: 660, y: 90, label: "q4", accept: true },
            ]}
            edges={[
              { from: "q0", to: "q1", label: "ε, ε → $" },
              { from: "q1", to: "q2", label: "1, ε → ε" },
              { from: "q2", to: "q3", label: "0, ε → ε" },
              { from: "q3", to: "q3", label: "0|1, ε → ε", side: "loop" },
              { from: "q3", to: "q4", label: "ε, $ → ε" },
            ]}
          />
        </Proof>
        <Proof title="L₂ = { 0ⁱ1ʲ2ᵏ | i = j + 2k }">
          <P>
            Push all 0s. Pop one 0 per 1. Then pop two 0s per 2 (a two-state gadget), then pop $.
            Equivalent view: i − j must be even and nonnegative, equal to 2k.
          </P>
        </Proof>
        <Proof title="L₃ = { w₁#w₂ | #1(w₁) = #0(w₂) }">
          <P>
            Ignore 0s in w₁, push X per 1 in w₁. On #, switch. Ignore 1s in w₂, pop X per 0 in w₂.
            Pop $ to accept. w₁, w₂ nonempty: force at least one symbol each with extra states if
            the question says {"{0,1}+"}.
          </P>
        </Proof>
        <Proof title="|w₁| = 3|w₂|  over  w₁#w₂">
          <P>
            Push one X per symbol of w₁. After #, for each symbol of w₂ pop three X’s (a 3-cycle
            of states). Accept on empty (only $ left).
          </P>
        </Proof>
        <Proof title="w#wᴿ with even number of 1s in w">
          <P>
            Track parity of 1s in the finite control while pushing w. On #, only continue if
            parity is even. Then pop wᴿ as a palindrome PDA. Finite control × stack is allowed —
            that is the whole point of a PDA.
          </P>
        </Proof>
        <Proof title="Starts with 0, ends with 0  (Summer L₁)">
          <P>
            Regular again. q0 --0→ q1 --0|1→ q1, and q1 is accepting only if you also handle the
            “ends with 0” with a last-symbol state q2. For a PDA: push $, read first 0, remember
            last symbol in the state, at end of input accept only if last was 0 and pop $.
          </P>
        </Proof>
      </Section>

      <Section id="traps" title="Traps">
        <Table
          head={["Trap", "Fix"]}
          rows={[
            ["Forgetting the $ marker", "Always push $ first, pop $ last. It distinguishes empty stack from ‘wrong top’."],
            ["Pushing and popping the same symbol on one edge without a guess", "You need a nondeterministic ε-transition at the boundary."],
            ["Trying to count three independent numbers", "Not a CFL. Say so; do not draw a fake PDA."],
            ["Accepting before the input is finished", "Pop $ only on ε-input, from a state reached after the last required symbol."],
            ["Omitting n = 0 / empty w", "Add the ε-path from push to pop."],
          ]}
        />
        <Callout kind="exam" title="10 marks = three diagrams">
          <P>
            Spend 2 minutes labelling regions of the string on scratch paper, then draw. Unlabelled
            arrows score 0. Write the language under each diagram.
          </P>
        </Callout>
      </Section>
    </div>
  );
}
