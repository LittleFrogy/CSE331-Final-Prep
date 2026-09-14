export type TopicSlug =
  | "pumping"
  | "cfg"
  | "pda"
  | "tm"
  | "halt"
  | "decidability"
  | "reducibility";

export type Topic = {
  slug: TopicSlug;
  no: string;
  co: string;
  title: string;
  short: string;
  exam: string;
  minutes: string;
  marks: string;
  sections: { id: string; label: string }[];
};

export const TOPICS: Topic[] = [
  {
    slug: "pumping",
    no: "01",
    co: "CO5",
    title: "Pumping Lemma",
    short: "Prove a language is not regular by finding a string that cannot be pumped.",
    exam: "Always 5 marks. One language, full proof.",
    minutes: "12 min",
    marks: "5",
    sections: [
      { id: "idea", label: "The idea" },
      { id: "statement", label: "Formal statement" },
      { id: "method", label: "6-step method" },
      { id: "worked", label: "Worked proofs" },
      { id: "exam", label: "Exam languages" },
      { id: "traps", label: "Traps" },
    ],
  },
  {
    slug: "cfg",
    no: "02",
    co: "CO3",
    title: "Context-Free Grammars",
    short: "Design CFGs, write derivations, draw parse trees, prove ambiguity.",
    exam: "Biggest chunk: 10–15 marks. Grammars + trees.",
    minutes: "25 min",
    marks: "10–15",
    sections: [
      { id: "idea", label: "The idea" },
      { id: "patterns", label: "Design patterns" },
      { id: "derive", label: "Derivations & trees" },
      { id: "ambig", label: "Ambiguity" },
      { id: "exam", label: "Exam grammars" },
      { id: "traps", label: "Traps" },
    ],
  },
  {
    slug: "pda",
    no: "03",
    co: "CO3",
    title: "Pushdown Automata",
    short: "Draw a PDA: push one quantity, pop it against another.",
    exam: "10 marks. Three state diagrams.",
    minutes: "20 min",
    marks: "10",
    sections: [
      { id: "idea", label: "The idea" },
      { id: "notation", label: "Notation" },
      { id: "method", label: "Design method" },
      { id: "worked", label: "Worked machines" },
      { id: "exam", label: "Exam PDAs" },
      { id: "traps", label: "Traps" },
    ],
  },
  {
    slug: "tm",
    no: "04",
    co: "CO4",
    title: "Turing Machines",
    short: "7-tuple, configurations, state diagrams that decide a language.",
    exam: "10 marks. Config + two diagrams + a closure proof.",
    minutes: "22 min",
    marks: "10",
    sections: [
      { id: "idea", label: "The idea" },
      { id: "config", label: "Configurations" },
      { id: "method", label: "Design method" },
      { id: "worked", label: "Worked machines" },
      { id: "closure", label: "Closure" },
      { id: "traps", label: "Traps" },
    ],
  },
  {
    slug: "halt",
    no: "05",
    co: "CO4",
    title: "The Halting Problem",
    short: "HALT_TM is undecidable. Diagonalisation, not a reduction yet.",
    exam: "Bonus 5, or mixed into TM. Know the proof cold.",
    minutes: "12 min",
    marks: "2–5",
    sections: [
      { id: "idea", label: "The idea" },
      { id: "proof", label: "The proof" },
      { id: "atm", label: "A_TM vs HALT" },
      { id: "complement", label: "Complement" },
      { id: "traps", label: "Traps" },
    ],
  },
  {
    slug: "decidability",
    no: "06",
    co: "CO4",
    title: "Decidability",
    short: "Build a decider. Simulate finite objects. Emptiness of DFAs.",
    exam: "Prove A_DFA / A_REX / a custom DFA language is decidable.",
    minutes: "10 min",
    marks: "2–5",
    sections: [
      { id: "idea", label: "The idea" },
      { id: "method", label: "How to prove" },
      { id: "worked", label: "Standard languages" },
      { id: "exam", label: "Exam proofs" },
      { id: "tf", label: "True / False" },
      { id: "traps", label: "Traps" },
    ],
  },
  {
    slug: "reducibility",
    no: "07",
    co: "CO4",
    title: "Reducibility",
    short: "Direction is everything. Known-hard → unknown proves unknown is hard.",
    exam: "Bonus 5, or 2-mark closure. HALT → complement of RE.",
    minutes: "12 min",
    marks: "2–5",
    sections: [
      { id: "idea", label: "The idea" },
      { id: "direction", label: "Direction" },
      { id: "decidable", label: "Proving decidable" },
      { id: "undecidable", label: "Proving undecidable" },
      { id: "exam", label: "Exam proofs" },
      { id: "traps", label: "Traps" },
    ],
  },
];

export function getTopic(slug: string) {
  return TOPICS.find((t) => t.slug === slug);
}

export const HIERARCHY = [
  { name: "Regular", note: "DFA / NFA / RE. Closed under ∪ ∩ complement * concat." },
  { name: "Context-free", note: "CFG / PDA. Closed under ∪ * concat. Not under ∩ or complement." },
  { name: "Decidable", note: "TM that always halts. Closed under ∪ ∩ complement * concat." },
  { name: "Recognizable", note: "TM that may loop on no. Closed under ∪ ∩ * concat. Not complement." },
];

export type QuizQ = {
  id: string;
  topic: TopicSlug;
  q: string;
  options: string[];
  answer: number;
  why: string;
};

export const QUIZ: QuizQ[] = [
  {
    id: "q1",
    topic: "decidability",
    q: "Regular ⊂ CFL ⊂ recognizable ⊂ decidable. True or false?",
    options: [
      "True",
      "False — decidable sits inside recognizable, not the other way around",
      "False — CFL is not a subset of recognizable",
      "False — regular is not a subset of CFL",
    ],
    answer: 1,
    why: "Correct chain: Regular ⊂ CFL ⊂ decidable ⊂ recognizable. Recognizers may loop; deciders always halt.",
  },
  {
    id: "q2",
    topic: "halt",
    q: "For Turing-recognizable languages, the machine halts on every input.",
    options: [
      "True",
      "False — that is the definition of decidable languages",
      "False — recognizers halt only on rejecting inputs",
      "True if the language is infinite",
    ],
    answer: 1,
    why: "A recognizer must halt and accept on yes-instances. On no-instances it may reject or loop.",
  },
  {
    id: "q3",
    topic: "pda",
    q: "Pushdown automata can recognize every regular and every non-regular language.",
    options: [
      "True",
      "False — PDAs recognize CFLs, and some non-regular languages are not context-free",
      "False — PDAs cannot recognize regular languages",
      "True, because the stack is infinite",
    ],
    answer: 1,
    why: "{aⁿbⁿcⁿ} is not context-free. A PDA cannot count three independent quantities.",
  },
  {
    id: "q4",
    topic: "pumping",
    q: "Some non-regular languages satisfy the pumping lemma.",
    options: [
      "True — pumping lemma is necessary but not sufficient for regularity",
      "False — failing to be regular means failing PL",
      "False — only finite languages satisfy PL",
      "True only for unary languages",
    ],
    answer: 0,
    why: "Classic: {aⁱbʲcᵏ | if i=1 then j=k} satisfies PL but is not regular (intersect with ab*c* to get {abⁿcⁿ}).",
  },
  {
    id: "q5",
    topic: "cfg",
    q: "A CFG for a regular language cannot be ambiguous.",
    options: [
      "True",
      "False — S → SS | a | ε generates a* and is ambiguous",
      "False only if the language is infinite",
      "True because regular languages have unique DFAs",
    ],
    answer: 1,
    why: "Ambiguity is a property of a grammar, not of the language. Regular languages can have wildly ambiguous CFGs.",
  },
  {
    id: "q6",
    topic: "tm",
    q: "In the configuration 10q₃1011, where is the tape head?",
    options: [
      "On the first 1 of the tape",
      "On the 0 immediately after q₃, i.e. the second 0 of 101011",
      "On the blank after the input",
      "Between 10 and 1011, on no symbol",
    ],
    answer: 1,
    why: "uqv means tape = uv, state = q, head on the first symbol of v. Tape is 101011, head on the second 0.",
  },
  {
    id: "q7",
    topic: "reducibility",
    q: "To prove C is undecidable you reduce C to a known undecidable problem D.",
    options: [
      "True",
      "False — you reduce the known-undecidable D to C (D ≤ C)",
      "True if both are recognizable",
      "False — reductions never prove undecidability",
    ],
    answer: 1,
    why: "A ≤ B means A is no harder than B. To show C is hard, show a hard problem reduces to C.",
  },
  {
    id: "q8",
    topic: "decidability",
    q: "Turing-decidable languages are closed under complement. Turing-recognizable languages are not.",
    options: ["True", "False — neither is closed", "False — both are closed", "False — only recognizable is closed"],
    answer: 0,
    why: "Swap accept/reject on a decider. You cannot swap on a recognizer because looping is not a reject you can flip.",
  },
  {
    id: "q9",
    topic: "cfg",
    q: "The complement of the palindrome language over {a,b} is context-free.",
    options: [
      "False — CFL not closed under complement",
      "True — force a mismatch aTb / bTa and let the middle be anything",
      "False — the complement is regular",
      "True only for even-length palindromes",
    ],
    answer: 1,
    why: "Non-closure of CFL under complement is about the class, not every language. This particular complement has a CFG.",
  },
  {
    id: "q10",
    topic: "pumping",
    q: "When proving {w | #0(w) = #1(w)} is not regular, why is s = (01)ᵖ a bad choice?",
    options: [
      "It is not in the language",
      "It can be pumped: y = 01 stays balanced",
      "It is shorter than p",
      "Condition 3 forbids it",
    ],
    answer: 1,
    why: "Pick s = 0ᵖ1ᵖ so that |xy| ≤ p forces y to be only 0s. Then pumping breaks equality.",
  },
  {
    id: "q11",
    topic: "pda",
    q: "The PDA label a, b → c means:",
    options: [
      "Read a, pop b, push c",
      "Read a, push b, pop c",
      "If stack top is a, replace it by bc",
      "Write a on the tape, move b, go to c",
    ],
    answer: 0,
    why: "Sipser/course notation: input a, pop b, push c. ε in any slot means ‘don’t read / don’t pop / don’t push’.",
  },
  {
    id: "q12",
    topic: "tm",
    q: "A decider is a Turing machine that",
    options: [
      "Accepts every string",
      "Halts (accept or reject) on every input",
      "Never uses the reject state",
      "Has a finite tape",
    ],
    answer: 1,
    why: "Recognizer: halt-accept on yes, maybe loop on no. Decider: halt on all inputs.",
  },
  {
    id: "q13",
    topic: "halt",
    q: "A_TM is recognizable. Why is it not decidable?",
    options: [
      "Because the tape is infinite",
      "Because HALT_TM reduces to it (or by diagonalisation) — a decider would decide the undecidable",
      "Because DFAs cannot simulate TMs",
      "Because it is not context-free",
    ],
    answer: 1,
    why: "The universal TM recognizes A_TM by simulation. If A_TM were decidable, HALT_TM would be too.",
  },
  {
    id: "q14",
    topic: "reducibility",
    q: "Why are recognizable languages not closed under complement?",
    options: [
      "Because CFLs are not",
      "If they were, every recognizable language would be decidable: run M and M-bar in parallel",
      "Because complement of A_TM is regular",
      "They actually are closed",
    ],
    answer: 1,
    why: "A and Ā both recognizable ⇒ decide A by dovetailing both machines. A_TM recognizable + not decidable ⇒ Ā_TM not recognizable.",
  },
  {
    id: "q15",
    topic: "decidability",
    q: "L = {⟨D⟩ | D is a DFA and every string D accepts contains at least one 1} is",
    options: [
      "Undecidable",
      "Decidable: check L(D) ∩ 0* = ∅ by product + DFA emptiness",
      "Recognizable but not decidable",
      "Not a language of encodings",
    ],
    answer: 1,
    why: "‘Every accepted string has a 1’ iff D accepts no string of only 0s (including ε). Emptiness of a DFA is decidable.",
  },
  {
    id: "q16",
    topic: "cfg",
    q: "To show a CFG is ambiguous you must",
    options: [
      "Write two leftmost derivations of the same string, or two different parse trees",
      "Show the language is not regular",
      "Find a string with no derivation",
      "Convert to Chomsky normal form",
    ],
    answer: 0,
    why: "Ambiguous = some string has two distinct parse trees (equivalently two distinct leftmost derivations).",
  },
  {
    id: "q17",
    topic: "tm",
    q: "Turing-decidable languages are closed under intersection because",
    options: [
      "You cannot simulate two machines",
      "Run decider M1, then if it accepts run decider M2; accept iff both accept",
      "Intersection of RE is not RE",
      "You must run them in parallel or you might loop",
    ],
    answer: 1,
    why: "Deciders always halt, so sequential composition is safe. For recognizers you would dovetail, but intersection of RE is still RE.",
  },
  {
    id: "q18",
    topic: "pumping",
    q: "Pumping down means using i = 0. When do you need it?",
    options: [
      "Never",
      "When pumping up (i=2) still lands in the language, e.g. {0ⁱ1ʲ | i > j}",
      "Only for unary languages",
      "When |y| = 1",
    ],
    answer: 1,
    why: "For {0ⁱ1ʲ | i > j} take 0^{p+1}1^p. Adding 0s stays in L; deleting y’s 0s drops i ≤ j and leaves L.",
  },
];
