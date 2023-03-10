export default function usePrice({ price, currency = 'TRY', region = 'tr-TR' }) {
  const formattedPrice = price.toLocaleString(region, { style: "currency", currency: currency, minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const currencySymbol = formattedPrice.slice(0, 1);
  const priceWithoutSymbol = formattedPrice.slice(1);

  const result = priceWithoutSymbol + currencySymbol;

  //const result = formattedPrice;
  return result;

}