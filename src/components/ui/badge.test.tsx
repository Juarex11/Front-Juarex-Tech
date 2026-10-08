import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Badge } from './badge';

describe('Badge', () => {
  it('renders its content', () => {
    render(<Badge>En curso</Badge>);

    expect(screen.getByText('En curso')).toBeInTheDocument();
  });

  it('supports the default variant', () => {
    render(<Badge>Predeterminado</Badge>);

    expect(screen.getByText('Predeterminado')).toHaveClass('bg-primary');
  });

  it('supports the secondary variant', () => {
    render(<Badge variant="secondary">Secundario</Badge>);

    expect(screen.getByText('Secundario')).toHaveClass('bg-secondary');
  });

  it('supports the destructive variant', () => {
    render(<Badge variant="destructive">Error</Badge>);

    expect(screen.getByText('Error')).toHaveClass('bg-destructive');
  });

  it('supports the outline variant', () => {
    render(<Badge variant="outline">Borrador</Badge>);

    expect(screen.getByText('Borrador')).toHaveClass('text-foreground');
  });

  it('allows custom classes', () => {
    render(<Badge className="uppercase">Estado</Badge>);

    expect(screen.getByText('Estado')).toHaveClass('uppercase');
  });
});
