"use client";

import { Field, MoneyInput, SectionCard, ShieldIcon, TextInput } from "./ui";

interface AssistanceSectionProps {
  type: string;
  price: string;
  errors: Record<string, string>;
  onChange: (values: { assistanceType?: string; assistancePrice?: string }) => void;
}

export function AssistanceSection({ type, price, errors, onChange }: AssistanceSectionProps) {
  return (
    <SectionCard
      step={4}
      icon={<ShieldIcon />}
      title="Asistencia"
      subtitle="Una única opción. Dejá el valor vacío si no se incluye."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Tipo de asistencia" error={errors.assistanceType}>
          <TextInput
            invalid={!!errors.assistanceType}
            value={type}
            onChange={(e) => onChange({ assistanceType: e.target.value })}
            placeholder="Cobertura médica 60.000 USD"
          />
        </Field>
        <Field label="Valor de la asistencia">
          <MoneyInput value={price} onChange={(e) => onChange({ assistancePrice: e.target.value })} />
        </Field>
      </div>
    </SectionCard>
  );
}
