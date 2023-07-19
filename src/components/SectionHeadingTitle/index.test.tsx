import { render, screen } from '@testing-library/react';
import SectionHeadingTitle from '@/components/SectionHeadingTitle';
import { IHeading } from '@/@types/types';

describe('Section Heading Title Component', () => {
  it('Render <SectionHeadingTitle />', () => {
    const object: IHeading = {
      title: 'Movies',
      link: '/movies'
    };

    render(<SectionHeadingTitle  {...object} />);

    expect(screen.getByText(/See All/i)).toBeInTheDocument()
  });
});