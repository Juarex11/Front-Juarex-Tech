import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Input } from './input';

describe('Input', () => {
  it('renders an input element', () => {
    render(<Input aria-label="Correo electrónico" />);

    expect(screen.getByRole('textbox', { name: 'Correo electrónico' })).toBeInTheDocument();
  });

  it('supports the invalid state', () => {
    render(<Input aria-label="Correo electrónico" aria-invalid="true" />);

    const input = screen.getByRole('textbox', {
      name: 'Correo electrónico',
    });

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveClass('aria-invalid:border-destructive');
    expect(input).toHaveClass('aria-invalid:ring-destructive/20');
  });

  it('supports the disabled state', () => {
    render(<Input aria-label="Correo electrónico" disabled />);

    expect(screen.getByRole('textbox', { name: 'Correo electrónico' })).toBeDisabled();
  });
});
