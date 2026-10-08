import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Textarea } from './textarea';

describe('Textarea', () => {
  it('renders correctly', () => {
    render(<Textarea placeholder="Escribe una descripción..." />);

    expect(screen.getByPlaceholderText('Escribe una descripción...')).toBeInTheDocument();
  });

  it('supports the disabled state', () => {
    render(<Textarea disabled placeholder="Campo deshabilitado" />);

    expect(screen.getByPlaceholderText('Campo deshabilitado')).toBeDisabled();
  });

  it('allows custom classes', () => {
    render(<Textarea className="min-h-32" placeholder="Descripción" />);

    expect(screen.getByPlaceholderText('Descripción')).toHaveClass('min-h-32');
  });
});
