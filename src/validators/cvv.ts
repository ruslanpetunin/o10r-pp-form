import type { Validator } from './../types';
import { useCardTypeDetector, CardTypeCode } from 'o10r-pp-core';

const { detect } = useCardTypeDetector();

const validator: Validator<'cvv'> = (value, formData, cardNumberKey) => {
  if (typeof value === 'string') {
    if (cardNumberKey && typeof formData[cardNumberKey] === 'string') {
      const cardType = detect(formData[cardNumberKey]);

      if (cardType?.code === CardTypeCode.AMEX) {
        return Boolean(value.match(/^\d{4}$/));
      }

      return Boolean(value.match(/^\d{3}$/));
    }

    return Boolean(value.match(/^\d{3,4}$/));
  }

  return false;
}

export default validator;
