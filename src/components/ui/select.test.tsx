import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, describe, expect, it } from 'vitest';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

beforeAll(() => {
  if (!HTMLElement.prototype.hasPointerCapture) {
    HTMLElement.prototype.hasPointerCapture = () => false;
  }

  if (!HTMLElement.prototype.setPointerCapture) {
    HTMLElement.prototype.setPointerCapture = () => {};
  }

  if (!HTMLElement.prototype.releasePointerCapture) {
    HTMLElement.prototype.releasePointerCapture = () => {};
  }

  if (!HTMLElement.prototype.scrollIntoView) {
    HTMLElement.prototype.scrollIntoView = () => {};
  }
});

function renderSelect(props: React.ComponentPropsWithoutRef<typeof SelectTrigger> = {}) {
  return render(
    <Select>
      <SelectTrigger aria-label="Estado" {...props}>
        <SelectValue placeholder="Selecciona un estado" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="pending">Pendiente</SelectItem>
        <SelectItem value="in-progress">En curso</SelectItem>
      </SelectContent>
    </Select>,
  );
}

describe('Select', () => {
  it('renders the placeholder', () => {
    renderSelect();

    expect(screen.getByRole('combobox', { name: 'Estado' })).toBeInTheDocument();

    expect(screen.getByText('Selecciona un estado')).toBeInTheDocument();
  });

  it('allows selecting an option', async () => {
    const user = userEvent.setup();

    renderSelect();

    await user.click(screen.getByRole('combobox', { name: 'Estado' }));

    await user.click(screen.getByRole('option', { name: 'En curso' }));

    expect(screen.getByText('En curso')).toBeInTheDocument();
  });

  it('supports the disabled state', () => {
    renderSelect({ disabled: true });

    const trigger = screen.getByRole('combobox', { name: 'Estado' });

    expect(trigger).toBeDisabled();
    expect(trigger).toHaveClass('disabled:cursor-not-allowed');
  });

  it('supports the invalid state', () => {
    renderSelect({ 'aria-invalid': 'true' });

    const trigger = screen.getByRole('combobox', { name: 'Estado' });

    expect(trigger).toHaveAttribute('aria-invalid', 'true');
    expect(trigger).toHaveClass('aria-invalid:border-destructive');
    expect(trigger).toHaveClass('aria-invalid:ring-destructive/20');
  });

  it('supports the interactive cursor and focus styles', () => {
    renderSelect();

    const trigger = screen.getByRole('combobox', { name: 'Estado' });

    expect(trigger).toHaveClass('cursor-pointer');
    expect(trigger).toHaveClass('focus:ring-1');
  });
});
