# o10r-pp-form

Utilities for building and validating payment forms.

## Installation

```bash
npm install o10r-pp-form
```

## useForm

`useForm` creates a form model with validation and submission helpers.

```ts
import { useForm } from 'o10r-pp-form';
import type { Field } from 'o10r-pp-core';

const fields: Field[] = [
  { name: 'pan', validation: { required: [], pan: [] } },
  { name: 'cvv', validation: { required: [], cvv: ['pan'] } },
  { name: 'expiry_month', validation: { required: [], expiry_month: [] } },
  { name: 'expiry_year', validation: { required: [], expiry_year: ['expiry_month'] } },
  { name: 'cardholder', validation: { required: [], cardholder: [] } }
];

const form = useForm(fields);

const data = {
  pan: '4111111111111111',
  cvv: '123',
  expiry_month: '12',
  expiry_year: '27',
  cardholder: 'John Doe'
};

const result = await form.validate(data); // { isValid: true, errors: {} }
await form.onSubmit(data); // throws if data is invalid
const collected = form.getCollectedData(); // returns last valid submission
```

## useValidation

`useValidation` builds a validator function for a single field.

```ts
import { useValidation, required, cvv } from 'o10r-pp-form';
import type { Field } from 'o10r-pp-core';

const field: Field = {
  name: 'cvv',
  validation: { required: [], cvv: ['pan'] }
};

const validate = useValidation(field, { required, cvv });

const errors = await validate('12', { pan: '4111111111111111' });
// errors => { cvv: ['pan'] } when validation fails
```

## Built-in validators

Each validator returns `true` when the value passes validation.

```ts
import {
  required,
  pan,
  cvv,
  cardholder,
  expiryMonth,
  expiryYear
} from 'o10r-pp-form';

required('value');
pan('4111111111111111');
cvv('123', { pan: '4111111111111111' }, 'pan');
cardholder('John Doe');
expiryMonth('12');
expiryYear('25', { expiry_month: '12' }, 'expiry_month');
```

