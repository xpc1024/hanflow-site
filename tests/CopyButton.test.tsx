import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CopyButton } from '../components/ui/CopyButton';

describe('CopyButton', () => {
  it('shows copied label after click', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    render(<CopyButton value="docker compose up -d" copiedLabel="Copied" />);
    await userEvent.click(screen.getByRole('button'));
    expect(writeText).toHaveBeenCalledWith('docker compose up -d');
    expect(await screen.findByText('Copied')).toBeInTheDocument();
  });
});
