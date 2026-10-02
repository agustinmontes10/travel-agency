import type { InputHTMLAttributes, ReactNode } from "react";
import { Input } from "@/components/ui";
import { cn } from "@/lib/cn";
import { formatUSD } from "../calculations";
import { ICON_PATHS, type IconName } from "../iconPaths";

/* ───────────── Iconos ───────────── */
type IconProps = { className?: string };
const svg = (className: string | undefined, children: ReactNode) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("h-5 w-5 shrink-0", className)}
    aria-hidden
  >
    {children}
  </svg>
);
const iconFor = (name: IconName) =>
  function Icon({ className }: IconProps) {
    return svg(
      className,
      ICON_PATHS[name].map((d) => <path key={d} d={d} />),
    );
  };
export const PlaneIcon = iconFor("plane");
export const BedIcon = iconFor("bed");
export const CarIcon = iconFor("car");
export const ShieldIcon = iconFor("shield");
export const PlusIcon = ({ className }: IconProps) => svg(className, <path d="M12 5v14M5 12h14" />);
export const TrashIcon = ({ className }: IconProps) =>
  svg(
    className,
    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />,
  );
export const CheckIcon = ({ className }: IconProps) => svg(className, <path d="m5 12 5 5 9-10" />);

/* ───────────── Campos ───────────── */
interface FieldProps {
  label: string;
  error?: string;
  hint?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function Field({ label, error, hint, className, children }: FieldProps) {
  return (
    <label className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      <span className="text-xs font-medium tracking-wide text-muted">{label}</span>
      {children}
      {error ? (
        <span className="text-xs text-red-600">{error}</span>
      ) : hint ? (
        <span className="text-xs text-muted-foreground">{hint}</span>
      ) : null}
    </label>
  );
}

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean };

export function TextInput({ invalid, className, ...props }: TextInputProps) {
  return (
    <Input
      aria-invalid={invalid || undefined}
      className={cn(
        "h-11 rounded-xl bg-white",
        invalid && "border-red-400 focus-visible:ring-red-400",
        className,
      )}
      {...props}
    />
  );
}

export function MoneyInput({ invalid, className, ...props }: TextInputProps) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground">
        US$
      </span>
      <TextInput
        type="number"
        inputMode="decimal"
        min={0}
        step="0.01"
        placeholder="0,00"
        invalid={invalid}
        className={cn("pl-12 tabular-nums", className)}
        {...props}
      />
    </div>
  );
}

/* ───────────── Contenedores ───────────── */
interface SectionCardProps {
  step: number;
  icon: ReactNode;
  title: string;
  subtitle: string;
  error?: string;
  children: ReactNode;
}

export function SectionCard({ step, icon, title, subtitle, error, children }: SectionCardProps) {
  return (
    <section className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-[0_1px_2px_rgba(19,36,59,0.04),0_24px_48px_-32px_rgba(19,36,59,0.28)] sm:p-7">
      <header className="mb-5 flex items-start gap-4">
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
          {icon}
          <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-white ring-2 ring-surface">
            {step}
          </span>
        </div>
        <div className="min-w-0">
          <h2 className="font-display text-xl leading-tight tracking-wide text-foreground">{title}</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
      </header>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}

interface AltCardProps {
  index: number;
  selected: boolean;
  subtotal: number;
  onSelect: () => void;
  onRemove?: () => void;
  children: ReactNode;
}

/** Una alternativa. El radio de la izquierda indica cuál entra en la cotización. */
export function AltCard({ index, selected, subtotal, onSelect, onRemove, children }: AltCardProps) {
  return (
    <div
      className={cn(
        "animate-pop-in rounded-2xl border bg-white p-4 transition-all duration-200 sm:p-5",
        selected
          ? "border-accent shadow-[0_0_0_3px_var(--accent-soft)]"
          : "border-border-subtle hover:border-accent/40",
      )}
    >
      <div className="mb-4 flex items-center gap-3">
        <button
          type="button"
          role="radio"
          aria-checked={selected}
          aria-label={`Incluir la alternativa ${index + 1} en la cotización`}
          onClick={onSelect}
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
            selected
              ? "border-accent bg-accent text-accent-foreground"
              : "border-border-subtle bg-white hover:border-accent",
          )}
        >
          {selected && <CheckIcon className="h-3.5 w-3.5" />}
        </button>
        <span className="text-sm font-semibold tracking-tight">Alternativa {index + 1}</span>
        {selected && (
          <span className="hidden rounded-full bg-gold-soft px-2.5 py-0.5 text-[11px] font-semibold text-gold sm:inline">
            En la cotización
          </span>
        )}
        <span className="ml-auto text-sm font-semibold tabular-nums text-foreground">
          {subtotal > 0 ? formatUSD(subtotal) : <span className="font-normal text-muted-foreground">—</span>}
        </span>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Quitar la alternativa ${index + 1}`}
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

/** Sub-bloque dentro de una alternativa (un hotel, un traslado). */
export function SubBlock({
  label,
  onRemove,
  children,
}: {
  label: string;
  onRemove?: () => void;
  children: ReactNode;
}) {
  return (
    <div className="animate-pop-in rounded-xl bg-surface-muted/60 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</span>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-xs text-muted-foreground transition-colors hover:text-red-600"
          >
            Quitar
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

export function AddButton({
  onClick,
  children,
  tone = "dashed",
}: {
  onClick: () => void;
  children: ReactNode;
  tone?: "dashed" | "soft";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        tone === "dashed"
          ? "w-full border-2 border-dashed border-border-subtle text-muted hover:border-accent hover:bg-accent-soft hover:text-accent"
          : "self-start bg-accent-soft text-accent hover:bg-accent/15",
      )}
    >
      <PlusIcon className="h-4 w-4" />
      {children}
    </button>
  );
}
