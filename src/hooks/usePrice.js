import React, { useState, useEffect } from "react";

export default function usePrice({ price, currency = 'TRY', region = 'tr-TR' }) {
  const [formatPrice,setFormatPrice] = useState(null);

  useEffect(()=>{
    const formattedPrice = price.toLocaleString(region, { style: "currency", currency: currency, minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const currencySymbol = formattedPrice.slice(0, 1);
    const priceWithoutSymbol = formattedPrice.slice(1);
  
    const result = priceWithoutSymbol + currencySymbol;

    setFormatPrice(result);

  },[price]);

  return formatPrice
}