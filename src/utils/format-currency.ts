import currencySymbols from './currency-symbols';

/**
 * Formats a number as currency
 * @param value - The number to format
 * @param currency - The currency code (e.g., 'USD', 'EUR', 'JPY', 'VND')
 * @param locale - The locale to use for formatting (default is 'en-US')
 * @returns The formatted currency string
 */
const formatCurrency = (
  value: number,
  currency: string,
  locale: string = 'en-US'
): string => {
  const formattedValue = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  const currencySymbol = currencySymbols[currency] || currency;

  return formattedValue.replace(currency, currencySymbol);
};

export default formatCurrency;
