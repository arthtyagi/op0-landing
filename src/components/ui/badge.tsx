import * as React from "react";
import { cn } from "../../lib/utils";

type BadgeVariant = "default" | "outline" | "ignite" | "mint" | "lilac";

const variants: Record<BadgeVariant, string> = {
  default: "border-transparent bg-secondary text-secondary-foreground",
  outline: "border border-border text-foreground",
  ignite: "border border-ignite/40 bg-ignite/10 text-ignite",
  mint: "border border-mint/40 bg-mint/10 text-mint",
  lilac: "border border-lilac/40 bg-lilac/10 text-lilac",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill px-2.5 py-0.5 font-mono text-xs lowercase tracking-wide",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
