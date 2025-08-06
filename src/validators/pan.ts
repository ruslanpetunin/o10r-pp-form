import type { Validator } from './../types';
import { useCardTypeDetector } from 'orchestrator-pp-core';

const { detect } = useCardTypeDetector();

function luhnCheck(cardNumber: string): boolean {
  /* eslint-disable */
  let b, c, d, e, f, g;
  for (d = !0, e = 0, c = (cardNumber + "").split("").reverse(), f = 0, g = c.length; f < g; f++) {
    b = c[f], b = parseInt(b, 10), (d = !d) && (b *= 2), b > 9 && (b -= 9), e += b;
  }
  return e % 10 === 0;
  /* eslint-enable */
}

const validator: Validator<'pan'> = (value) => {
  if (typeof value === 'string') {
    const cardNumber: string = value.replace(/[^0-9]/g, '');
    const cardNumberLength: number = cardNumber.length;
    const cardType = detect(cardNumber);

    if (cardType) {
      if (cardNumberLength >= cardType.minLength && cardNumberLength <= cardType.maxLength) {
        if (cardType.luhn) {
          return luhnCheck(cardNumber);
        }

        return true;
      }
    }
  }

  return false;
}

export default validator;
