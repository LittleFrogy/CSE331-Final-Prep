import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "ink";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-surface hover:bg-accent-2 shadow-[0_1px_0_rgba(255,255,255,0.12)_inset]",
  secondary:
    "bg-surface text-ink shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
  ghost: "bg-transparent text-ink-soft hover:bg-surface-2 hover:text-ink",
  ink: "bg-ink text-bg hover:bg-tape",
};

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
    size?: "sm" | "md";
    asChild?: boolean;
  }
>(function Button(
  { className, variant = "primary", size = "md", asChild = false, ...props },
  ref,
) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-[transform,background-color,box-shadow,color] duration-150 ease-[var(--ease-out)] active:not-disabled:scale-[0.96] disabled:opacity-50",
        size === "sm" ? "h-9 px-3 text-sm" : "h-11 px-4 text-[0.95rem]",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
});
