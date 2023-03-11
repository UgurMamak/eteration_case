import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import Counter from './index';

test('counter prop test succcess', () => {
  const countProp= "0";
  render(<Counter count={countProp} />)

  const counter = screen.getByText(countProp);

  expect(counter.textContent).toEqual(countProp)

});