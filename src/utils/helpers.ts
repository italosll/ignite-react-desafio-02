export const currencyFormatter = (price: string | number) => {
  const intlNumberFormat = new Intl.NumberFormat("pt-BR", {
    style: "decimal",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  return intlNumberFormat.format(Number(price));
};
