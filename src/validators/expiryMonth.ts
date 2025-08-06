import type { Validator } from './../types';

const validator: Validator<'expiry_month'> = (value) => {
  if (typeof value === 'string') {
    const month = parseInt(value, 10);

    if (month >= 1 && month <= 12) {
      return true;
    }
  }

  return false;
}

export default validator;
