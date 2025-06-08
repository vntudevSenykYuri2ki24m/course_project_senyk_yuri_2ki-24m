export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    currencyDisplay: 'symbol'
  })
      .format(price)
      .replace('\u00A0', ' ')
      .replace('₴', '')
      .trim() + ' ₴';
};

export const formatDate = (date: Date | string): string => {
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj.toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).replace(' р.', '') + ' р.';
};

export const formatDateTime = (date: Date | string): string => {
  const dateObj = date instanceof Date ? date : new Date(date);
  const formattedDate = dateObj.toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).replace(' р.', '');

  const formattedTime = dateObj.toLocaleTimeString('uk-UA', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  return `${formattedDate} р., ${formattedTime}`;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.trim().substring(0, maxLength - 1) + '...';
};

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

export const formatOrderId = (orderId: string): string => {
  return '#' + orderId.toUpperCase();
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  const cleaned = phoneNumber.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }

  return phoneNumber;
};

export const formatCardNumber = (cardNumber: string): string => {
  const cleaned = cardNumber.replace(/\s/g, '');
  const groups = [];

  for (let i = 0; i < cleaned.length; i += 4) {
    groups.push(cleaned.substring(i, i + 4));
  }

  return groups.join(' ');
};

export const maskCardNumber = (cardNumber: string): string => {
  const cleaned = cardNumber.replace(/\s/g, '');

  if (cleaned.length <= 4) {
    return cleaned;
  }

  const lastFourDigits = cleaned.slice(-4);
  let masked = '';

  const groups = Math.ceil(cleaned.length / 4);

  for (let i = 0; i < groups - 1; i++) {
    masked += '**** ';
  }

  masked += lastFourDigits;

  return masked;
};