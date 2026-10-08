import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';

describe('Card', () => {
  it('renders its content', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Proyecto de ejemplo</CardTitle>
          <CardDescription>Descripción del proyecto</CardDescription>
        </CardHeader>

        <CardContent>Contenido del proyecto</CardContent>

        <CardFooter>Acciones</CardFooter>
      </Card>,
    );

    expect(screen.getByText('Proyecto de ejemplo')).toBeInTheDocument();
    expect(screen.getByText('Descripción del proyecto')).toBeInTheDocument();
    expect(screen.getByText('Contenido del proyecto')).toBeInTheDocument();
    expect(screen.getByText('Acciones')).toBeInTheDocument();
  });

  it('uses the design system surface styles', () => {
    render(<Card>Contenido</Card>);

    const card = screen.getByText('Contenido');

    expect(card).toHaveClass('rounded-xl');
    expect(card).toHaveClass('border-border');
    expect(card).toHaveClass('bg-card');
    expect(card).toHaveClass('shadow-sm');
  });

  it('supports a semantic title element with asChild', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle asChild>
            <h2>Proyecto de ejemplo</h2>
          </CardTitle>
        </CardHeader>
      </Card>,
    );

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Proyecto de ejemplo',
      }),
    ).toBeInTheDocument();
  });

  it('allows custom classes', () => {
    render(<Card className="max-w-md">Contenido</Card>);

    expect(screen.getByText('Contenido')).toHaveClass('max-w-md');
  });
});
