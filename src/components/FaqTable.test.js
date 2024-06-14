// src/components/FaqTable.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { FaqProvider } from '../context/FaqContext';
import FaqTable from './FaqTable';

test('renders FAQ table with provided data', () => {
  const faqs = [
    { id: 1, question: 'What is the vision of iLabs?', category: 'About Company', status: 'Published' },
    { id: 2, question: 'What is the mission of iLabs?', category: 'About Company', status: 'Published' },
  ];

  render(
    <FaqProvider>
      <FaqTable faqs={faqs} />
    </FaqProvider>
  );

  expect(screen.getByText('What is the vision of iLabs?')).toBeInTheDocument();
  expect(screen.getByText('What is the mission of iLabs?')).toBeInTheDocument();
});
