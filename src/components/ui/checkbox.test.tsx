import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  it('renders correctly', () => {
    render(<Checkbox aria-label="Recibir notificaciones" />);

    expect(screen.getByRole('checkbox', { name: 'Recibir notificaciones' })).toBeInTheDocument();
  });

  it('supports checking and unchecking', async () => {
    const user = userEvent.setup();

    render(<Checkbox aria-label="Recibir notificaciones" />);

    const checkbox = screen.getByRole('checkbox', {
      name: 'Recibir notificaciones',
    });

    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);

    expect(checkbox).toBeChecked();

    await user.click(checkbox);

    expect(checkbox).not.toBeChecked();
  });

  it('supports the disabled state', () => {
    render(<Checkbox aria-label="Opción deshabilitada" disabled />);

    expect(screen.getByRole('checkbox', { name: 'Opción deshabilitada' })).toBeDisabled();
  });
});
