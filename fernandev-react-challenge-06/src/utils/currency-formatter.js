export function currencyFormatter(value) {
  const currencyFormatter = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return currencyFormatter.format(value);
}
