import * as React from "react";
import { cn } from "../../lib/utils";

type Variant = "default" | "outline" | "ghost" | "link";
type Size = "default" | "sm" | "lg" | "icon";

const variants: Record<Variant, string> = {
  default:
    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-none",
  outline:
    "border border-border bg-transparent text-foreground hover:bg-secondary/60 hover:text-foreground",
  ghost: "bg-transparent text-foreground hover:bg-secondary/60",
  link: "text-foreground underline-offset-4 hover:underline",
};

const sizes: Record<Size, string> = {
  default: "h-10 px-5 py-2.5 text-sm",
  sm: "h-9 px-4 text-sm",
  lg: "h-12 px-7 text-base",
  icon: "size-10",
};

export interface ButtonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  asChild?: boolean;
  children?: React.ReactNode;
}

/** When asChild, the child element (e.g. an <a>) receives the button classes. */
export function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  children,
  ...props
}: ButtonProps & React.HTMLAttributes<HTMLElement>) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
      className: cn(classes, (children as React.ReactElement<{ className?: string }>).props.className),
      ...props,
    });
  }

  return (
    <button className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
Button.displayName = "Button";
