import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import Pagination from './index';

test('pagination render susccess', () => {
  const currentPage = 1;
  const totalCount = 86;
  const itemPerPage = 12;
  render(<Pagination currentPage={currentPage} itemPerPage={itemPerPage} totalCount={totalCount} />)
});
