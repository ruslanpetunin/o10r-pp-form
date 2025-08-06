import type { Validator } from './../types';

const validator: Validator<'expiry_year'> = (value, formData, expiryMonthKey) => {
  if (typeof value === 'string') {
    const year = parseInt(value, 10);
    const currentYear = new Date().getFullYear() % 100;

    if (year > currentYear) {
      return true;
    } else if (year === currentYear) {
      if (expiryMonthKey && typeof formData[expiryMonthKey] === 'string' && formData[expiryMonthKey]) {
        const month = parseInt(formData[expiryMonthKey], 10);
        const currentMonth = new Date().getMonth() + 1;

        return month >= currentMonth;
      }

      return true;
    }
  }

  return false;
}

export default validator;
