import { render, screen } from '@testing-library/react';
import EmptyData from '@/components/EmptyData';

describe('Card Rating Component', () => {
  it('Render <EmptyData />', () => {
    render(<EmptyData />);

    expect(screen.getByText(/No results found/i)).toBeInTheDocument()
  });
});