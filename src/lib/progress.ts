const KEY = "cse331-final-lab-progress-v1";

export type Progress = {
  completed: string[];
  quizBest: number;
};

const empty: Progress = { completed: [], quizBest: 0 };

export function loadProgress(): Progress {
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Progress;
    return {
      completed: Array.isArray(parsed.completed) ? parsed.completed : [],
      quizBest: typeof parsed.quizBest === "number" ? parsed.quizBest : 0,
    };
  } catch {
    return empty;
  }
}

export function saveProgress(next: Progress) {
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function toggleComplete(id: string): Progress {
  const cur = loadProgress();
  const has = cur.completed.includes(id);
  const completed = has
    ? cur.completed.filter((x) => x !== id)
    : [...cur.completed, id];
  const next = { ...cur, completed };
  saveProgress(next);
  return next;
}

export function setQuizBest(score: number): Progress {
  const cur = loadProgress();
  const next = { ...cur, quizBest: Math.max(cur.quizBest, score) };
  saveProgress(next);
  return next;
}
