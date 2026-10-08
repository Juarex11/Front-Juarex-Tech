import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Input } from './input';
import { Field, FieldDescription, FieldError, FieldLabel } from './field';

describe('Field', () => {
  it('renders a label associated with the control', () => {
    render(
      <Field>
        <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
        <Input id="email" />
      </Field>,
    );

    expect(screen.getByLabelText('Correo electrónico')).toBeInTheDocument();
  });

  it('renders a field description', () => {
    render(
      <Field>
        <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
        <Input id="email" />
        <FieldDescription>Usaremos este correo para enviarte notificaciones.</FieldDescription>
      </Field>,
    );

    expect(
      screen.getByText('Usaremos este correo para enviarte notificaciones.'),
    ).toBeInTheDocument();
  });

  it('renders an error message', () => {
    render(
      <Field data-invalid>
        <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
        <Input id="email" aria-invalid />
        <FieldError>Ingresa un correo válido.</FieldError>
      </Field>,
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Ingresa un correo válido.');
  });

  it('does not render FieldError without content', () => {
    render(
      <Field>
        <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
        <Input id="email" />
        <FieldError />
      </Field>,
    );

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
