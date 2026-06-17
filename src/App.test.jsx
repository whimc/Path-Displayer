import React from 'react';
import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App.jsx';

test('renders the path displayer heading', () => {
  render(<App />);
  expect(screen.getByText(/Welcome to the WHIMC Path Displayer!/i)).toBeInTheDocument();
});
