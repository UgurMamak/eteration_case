import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderHook } from '@testing-library/react-hooks';

import usePrice from './usePrice';

test('usePrice hook success', () => {
 const {result} = renderHook(()=>usePrice({ price:802, currency: 'TRY', region : 'tr-TR' }));
 expect(result.current).toEqual("802,00₺")
});


