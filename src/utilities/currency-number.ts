export const currencyNumber = (
  value: number,
  options?: Intl.NumberFormatOptions
) => {
  if (
    typeof Intl == "object" &&
    Intl &&
    typeof Intl.NumberFormat == "function"
  ) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
      ...options,
    }).format(value);
  }

  return value.toString();
};
