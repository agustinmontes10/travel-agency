import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border-subtle bg-surface p-6 shadow-[0_1px_2px_rgba(19,36,59,0.04),0_16px_40px_-24px_rgba(19,36,59,0.25)]",
        className
      )}
      {...props}
    />
  );
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  align?: "left" | "center";
}

export function CardHeader({
  className,
  align = "left",
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={cn(
        "mb-4 flex flex-col gap-2",
        align === "center" && "items-center text-center",
        className
      )}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <h2
      className={cn(
        "font-display text-lg font-semibold tracking-tight text-foreground",
        className
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-sm leading-relaxed text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-3", className)} {...props} />
  );
}

