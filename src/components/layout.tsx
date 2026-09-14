import { Link, useRouterState } from "@tanstack/react-router";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { TOPICS } from "@/lib/content";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Desk" },
  { to: "/exam", label: "Exam bank" },
  { to: "/cheatsheet", label: "Cheatsheet" },
  { to: "/quiz", label: "Drill" },
  { to: "/resources", label: "Resources" },
];

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-dvh">
      <header
        className={cn(
          "no-print sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-200",
          scrolled
            ? "border-line bg-bg/90 shadow-[0_1px_0_rgba(26,24,20,0.04)] backdrop-blur-md"
            : "border-transparent bg-bg/70",
        )}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-sm bg-ink text-[0.7rem] font-semibold tracking-wide text-bg">
              331
            </span>
            <span className="leading-tight">
              <span className="block font-display text-[0.95rem] font-semibold tracking-tight">
                Final Lab
              </span>
              <span className="hidden text-[0.7rem] uppercase tracking-[0.16em] text-muted sm:block">
                Automata · CSE331
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-colors duration-150",
                  pathname === n.to
                    ? "bg-accent-soft text-accent-2"
                    : "text-ink-soft hover:bg-surface-2 hover:text-ink",
                )}
              >
                {n.label}
              </Link>
            ))}
            <Button asChild size="sm" variant="ink" className="ml-1">
              <Link to="/print">
                <Download className="size-3.5" />
                PDF
              </Link>
            </Button>
          </nav>

          <button
            type="button"
            className="grid size-11 place-items-center rounded-md md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-line bg-surface px-4 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="rounded-md px-3 py-3 text-base text-ink-soft"
                >
                  {n.label}
                </Link>
              ))}
              <div className="mt-2 text-[0.7rem] uppercase tracking-[0.16em] text-faint">
                Topics
              </div>
              {TOPICS.map((t) => (
                <Link
                  key={t.slug}
                  to="/topics/$slug"
                  params={{ slug: t.slug }}
                  className="rounded-md px-3 py-2.5 text-sm"
                >
                  {t.no} · {t.title}
                </Link>
              ))}
              <Button asChild className="mt-2 w-full" variant="ink">
                <Link to="/print">Download / print PDF</Link>
              </Button>
            </div>
          </div>
        )}
      </header>
      <main>{children}</main>
      <footer className="no-print border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>CSE331 Final Lab · Sipser + course notes, written for the 110-minute paper.</p>
          <p className="text-faint">Regular ⊂ CFL ⊂ decidable ⊂ recognizable</p>
        </div>
      </footer>
    </div>
  );
}

export function PageWidth({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>{children}</div>
  );
}
