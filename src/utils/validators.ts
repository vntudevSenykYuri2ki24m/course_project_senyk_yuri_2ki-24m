export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-()]+$/;
  const cleaned = phone.replace(/\D/g, "");
  return phoneRegex.test(phone) && cleaned.length >= 10 && cleaned.length <= 15;
};

export const isValidZipCode = (zipCode: string): boolean => {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zipCode);
};

export const isValidCardNumber = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\D/g, "");
  if (cleaned.length < 13 || cleaned.length > 19) return false;

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

export const isValidCVV = (cvv: string): boolean => {
  const cvvRegex = /^\d{3,4}$/;
  return cvvRegex.test(cvv);
};

export const isValidExpiryDate = (expiryDate: string): boolean => {
  const regex = /^(0[1-9]|1[0-2])\/(\d{2})$/;
  const match = expiryDate.match(regex);

  if (!match) return false;

  const month = parseInt(match[1], 10);
  const year = parseInt(match[2], 10) + 2000;
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;

  return true;
};

export const isValidName = (name: string): boolean => {
  return name.trim().length >= 2 && name.trim().length <= 50;
};

export const isValidAddress = (address: string): boolean => {
  return address.trim().length >= 5 && address.trim().length <= 200;
};

export const validateCheckoutForm = (form: any): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!isValidName(form.firstName)) {
    errors.firstName = "Ім'я повинно містити від 2 до 50 символів";
  }

  if (!isValidName(form.lastName)) {
    errors.lastName = "Прізвище повинно містити від 2 до 50 символів";
  }

  if (!isValidEmail(form.email)) {
    errors.email = "Будь ласка, введіть дійсну електронну адресу";
  }

  if (!isValidPhone(form.phone)) {
    errors.phone = "Будь ласка, введіть дійсний номер телефону";
  }

  if (!isValidAddress(form.address)) {
    errors.address = "Адреса повинна містити від 5 до 200 символів";
  }

  if (!isValidName(form.city)) {
    errors.city = "Назва міста повинна містити від 2 до 50 символів";
  }

  if (!isValidZipCode(form.zipCode)) {
    errors.zipCode = "Будь ласка, введіть дійсний поштовий індекс";
  }

  if (!isValidCardNumber(form.cardNumber)) {
    errors.cardNumber = "Будь ласка, введіть дійсний номер картки";
  }

  if (!isValidName(form.cardName)) {
    errors.cardName = "Ім'я власника картки повинно містити від 2 до 50 символів";
  }

  if (!isValidExpiryDate(form.expiryDate)) {
    errors.expiryDate = "Будь ласка, введіть дійсну дату закінчення терміну дії (ММ/РР)";
  }

  if (!isValidCVV(form.cvv)) {
    errors.cvv = "Будь ласка, введіть дійсний CVV-код";
  }

  return errors;
};