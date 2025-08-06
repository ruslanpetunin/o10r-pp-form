import type { Validator } from './../types';

const holderRegExp = /\s+/g;
const doubleCharactersRegExp = /([.'-])\1/;

const validator: Validator<'cardholder'> = (value) => {
  if (typeof value === 'string' && !value.match(doubleCharactersRegExp)) {
    return value.split(holderRegExp).length >= 2
      && value.replace(holderRegExp, '').length >= 3
      && value.split('.').length <= 3
      && value.split('-').length <= 3;
  }

  return false;
}

export default validator;
