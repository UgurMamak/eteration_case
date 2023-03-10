import React from 'react';
import usePrice from '../../hooks/usePrice';

export default function Price({price,currency,region}) {
  return usePrice({price:price,currency:currency,region:region});
};
