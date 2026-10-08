import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Switch } from './switch';

describe('Switch', () => {
  it('renders correctly', () => {
    render(<Switch aria-label="Activar notificaciones" />);

    expect(screen.getByRole('switch', { name: 'Activar notificaciones' })).toBeInTheDocument();
  });

  it('supports toggling', async () => {
    const user = userEvent.setup();

    render(<Switch aria-label="Activar notificaciones" />);

    const switchElement = screen.getByRole('switch', {
      name: 'Activar notificaciones',
    });

    expect(switchElement).not.toBeChecked();

    await user.click(switchElement);

    expect(switchElement).toBeChecked();

    await user.click(switchElement);

    expect(switchElement).not.toBeChecked();
  });

  it('supports the disabled state', () => {
    render(<Switch aria-label="Opción deshabilitada" disabled />);

    expect(screen.getByRole('switch', { name: 'Opción deshabilitada' })).toBeDisabled();
  });
});
