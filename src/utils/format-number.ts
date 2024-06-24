export default function formatNumber(input: string) {
  const [integerPart, floatingPart] = input.split('.');

  const formattedValue = Intl.NumberFormat('en-US').format(
    +integerPart.replaceAll(',', '')
  );

  if (floatingPart !== undefined) {
    return `${formattedValue}.${floatingPart}`;
  }

  return formattedValue;
}
