import type { Validator } from './../types';

const validator: Validator<'required'> = (value) => {
  return Boolean(value);
}

export default validator;
