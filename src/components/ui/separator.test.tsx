import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Separator } from './separator';

describe('Separator', () => {
  it('renders a horizontal separator by default', () => {
    render(<Separator data-testid="separator" />);

    const separator = screen.getByTestId('separator');

    expect(separator).toHaveAttribute('data-orientation', 'horizontal');
    expect(separator).toHaveClass('h-[1px]');
    expect(separator).toHaveClass('w-full');
  });

  it('supports vertical orientation', () => {
    render(
      <div className="h-10">
        <Separator orientation="vertical" data-testid="separator" />
      </div>,
    );

    const separator = screen.getByTestId('separator');

    expect(separator).toHaveAttribute('data-orientation', 'vertical');
    expect(separator).toHaveClass('h-full');
    expect(separator).toHaveClass('w-[1px]');
  });

  it('uses the design system border color', () => {
    render(<Separator data-testid="separator" />);

    expect(screen.getByTestId('separator')).toHaveClass('bg-border');
  });

  it('is decorative by default', () => {
    render(<Separator data-testid="separator" />);

    const separator = screen.getByTestId('separator');

    expect(separator).toHaveAttribute('data-orientation', 'horizontal');
    expect(separator).not.toHaveAttribute('role', 'separator');
  });

  it('supports a semantic separator', () => {
    render(<Separator decorative={false} data-testid="separator" />);

    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('allows custom classes', () => {
    render(<Separator className="my-4" data-testid="separator" />);

    expect(screen.getByTestId('separator')).toHaveClass('my-4');
  });
});
