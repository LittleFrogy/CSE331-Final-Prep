import { createFileRoute } from "@tanstack/react-router";
import { Shell, PageWidth } from "@/components/layout";
import { ExternalLink, BookOpen, Video, MonitorPlay } from "lucide-react";

export const Route = createFileRoute("/resources")({
  component: ResourcesPage,
});

function ResourcesPage() {
  return (
    <Shell>
      <PageWidth className="py-8 sm:py-12">
        <div className="mb-10 max-w-2xl">
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            External Resources
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-soft">
            The theory of computation is deep. If the cheatsheet isn't enough to make a concept click,
            these textbooks, video lectures, and interactive tools will help you master it.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <ResourceSection
            icon={<BookOpen className="size-5 text-accent-1" />}
            title="Textbooks & Readings"
            items={[
              {
                title: "Introduction to the Theory of Computation",
                author: "Michael Sipser",
                desc: "The absolute gold standard. If there's one book you read, make it this one. The proofs are written with intuition first.",
              },
              {
                title: "Introduction to Automata Theory, Languages, and Computation",
                author: "Hopcroft, Motwani, & Ullman",
                desc: "A slightly more rigorous classic. Excellent for formal definitions and advanced context-free grammar parsing.",
              },
            ]}
          />

          <ResourceSection
            icon={<Video className="size-5 text-accent-1" />}
            title="Video Lectures"
            items={[
              {
                title: "MIT 18.404J: Theory of Computation",
                author: "Prof. Michael Sipser",
                desc: "Watch the author of the textbook teach the course himself. Unmatched clarity on undecidability and the halting problem.",
                link: "https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/",
              },
              {
                title: "Neso Academy: Theory of Computation",
                author: "YouTube Playlist",
                desc: "Bite-sized, practical videos. Highly recommended for learning how to mechanically construct PDAs and Turing Machines.",
                link: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRgp46KUv4ZY69yXmacbNUvd",
              },
              {
                title: "Easy Theory",
                author: "Ryan Dougherty",
                desc: "A YouTube channel entirely dedicated to Automata Theory. Covers hundreds of specific edge-case problems.",
                link: "https://www.youtube.com/c/EasyTheory",
              },
            ]}
          />

          <ResourceSection
            icon={<MonitorPlay className="size-5 text-accent-1" />}
            title="Interactive Tools"
            items={[
              {
                title: "JFLAP",
                author: "Susan Rodger",
                desc: "The classic Java software for building and simulating DFAs, NFAs, PDAs, and TMs visually.",
                link: "https://www.jflap.org/",
              },
              {
                title: "Automata Tutor",
                author: "Web Tool",
                desc: "An excellent modern web-based tool for drawing automatons and getting instant feedback on whether they accept the right language.",
                link: "https://automatatutor.com/",
              },
              {
                title: "Regex101",
                author: "Web Tool",
                desc: "While it uses modern regex (not strict formal RE), it's the best way to interactively test and debug patterns.",
                link: "https://regex101.com/",
              },
            ]}
          />
        </div>
      </PageWidth>
    </Shell>
  );
}

function ResourceSection({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  items: { title: string; author: string; desc: string; link?: string }[];
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2 border-b border-line pb-2">
        {icon}
        <h2 className="font-display text-lg font-semibold">{title}</h2>
      </div>
      <div className="flex flex-col gap-6">
        {items.map((item, i) => (
          <div key={i} className="group relative flex flex-col gap-1.5">
            <h3 className="font-medium leading-tight">
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-accent-1 hover:underline"
                >
                  {item.title}
                  <ExternalLink className="size-3 text-muted transition-colors group-hover:text-accent-1" />
                </a>
              ) : (
                item.title
              )}
            </h3>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted">
              {item.author}
            </div>
            <p className="text-sm leading-relaxed text-ink-soft">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
