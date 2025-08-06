import type { Field, FieldValidationRules } from 'orchestrator-pp-core';

export interface Form {
  fields: Field[],
  validate: ValidateForm,
  onSubmit: (data: Record<string, unknown>) => Promise<void> | void,
}

export type ValidatorMap = Partial<{
  [K in keyof FieldValidationRules]: Validator<K>
}>;

export type Validator<K extends keyof FieldValidationRules> = (
  value: unknown,
  formData: Record<string, unknown>,
  ...options: FieldValidationRules[K]
) => boolean | Promise<boolean>;

export type ValidateField = (value: unknown, formData: Record<string, unknown>) => Promise<Partial<FieldValidationRules>>;

export type ValidateForm = (data: Record<string, unknown>) => Promise<FormValidationResult>;

export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, Partial<FieldValidationRules>>;
}
