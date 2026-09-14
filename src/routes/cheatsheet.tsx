import { createFileRoute, Link } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageWidth, Shell } from "@/components/layout";
import { CheatsheetBody } from "@/notes/cheatsheet-body";

export const Route = createFileRoute("/cheatsheet")({ component: Sheet });

function Sheet() {
  return (
    <Shell>
      <PageWidth className="py-10 sm:py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-accent">
              Last-night card
            </p>
            <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Cheatsheet
            </h1>
            <p className="mt-3 max-w-xl text-lg text-ink-soft">
              Hierarchy, closure, CFG templates, PDA/TM notation, the languages you must classify.
            </p>
          </div>
          <Button asChild variant="ink">
            <Link to="/print">
              <Download className="size-4" />
              Full PDF
            </Link>
          </Button>
        </div>
        <div className="mt-10">
          <CheatsheetBody />
        </div>
      </PageWidth>
    </Shell>
  );
}
