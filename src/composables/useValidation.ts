import type { ValidateField, ValidatorMap, Validator } from './../types';
import type { Field, FieldValidationRules } from 'orchestrator-pp-core';

export default function(field: Field, validatorMap: ValidatorMap): ValidateField {
  const validate: ValidateField = async (value, formData) => {
    const failedRules: Partial<FieldValidationRules> = {};
    const fieldRules= field.validation || {};

    for (const rule of Object.keys(fieldRules) as (keyof FieldValidationRules)[]) {
      const validator = validatorMap[rule];
      const options = fieldRules[rule];

      if (validator && options) {
        const isValid = await (validator as Validator<typeof rule>)(value, formData, ...options);

        if (!isValid) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (failedRules as any)[rule] = options;
        }
      }
    }

    return failedRules;
  };

  return validate;
}
