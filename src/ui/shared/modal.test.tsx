import { render, screen } from '@testing-library/react';
import { Modal } from './modal';

describe('<Modal>', () => {
  it('renders given content with dialog role', () => {
    render(
      <Modal>
        <div>Hello</div>
      </Modal>
    );
    const dialogElt = screen.getByRole('dialog');
    expect(dialogElt).toBeInTheDocument();
    expect(dialogElt).toContainHTML('<div>Hello</div>');
  });
});
