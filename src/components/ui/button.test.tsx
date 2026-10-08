import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from './button';

describe('Button', () => {
  it('renders its content', () => {
    render(<Button>Guardar</Button>);

    expect(screen.getByRole('button', { name: 'Guardar' })).toBeInTheDocument();
  });

  it('supports the disabled state', () => {
    render(<Button disabled>Guardar</Button>);

    expect(screen.getByRole('button', { name: 'Guardar' })).toBeDisabled();
  });

  it('supports the interactive cursor and focus styles', () => {
    render(<Button>Guardar</Button>);

    const button = screen.getByRole('button', { name: 'Guardar' });

    expect(button).toHaveClass('cursor-pointer');
    expect(button).toHaveClass('focus-visible:ring-2');
  });

  it('supports variants', () => {
    render(
      <>
        <Button variant="destructive">Eliminar</Button>
        <Button variant="outline">Cancelar</Button>
        <Button variant="secondary">Secundario</Button>
        <Button variant="ghost">Más</Button>
        <Button variant="link">Ver detalles</Button>
      </>,
    );

    expect(screen.getByRole('button', { name: 'Eliminar' })).toHaveClass('bg-destructive');

    expect(screen.getByRole('button', { name: 'Cancelar' })).toHaveClass('border');

    expect(screen.getByRole('button', { name: 'Secundario' })).toHaveClass('bg-secondary');

    expect(screen.getByRole('button', { name: 'Más' })).toHaveClass('hover:bg-accent');

    expect(screen.getByRole('button', { name: 'Ver detalles' })).toHaveClass('text-primary');
  });

  it('supports the available sizes', () => {
    render(
      <>
        <Button size="sm">Pequeño</Button>
        <Button size="default">Normal</Button>
        <Button size="lg">Grande</Button>
        <Button size="icon" aria-label="Configuración">
          ⚙
        </Button>
      </>,
    );

    expect(screen.getByRole('button', { name: 'Pequeño' })).toHaveClass('h-8');

    expect(screen.getByRole('button', { name: 'Normal' })).toHaveClass('h-9');

    expect(screen.getByRole('button', { name: 'Grande' })).toHaveClass('h-10');

    expect(screen.getByRole('button', { name: 'Configuración' })).toHaveClass('w-9');
  });
});
