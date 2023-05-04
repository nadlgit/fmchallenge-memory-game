import { render, screen } from '@testing-library/react';
import { Modal } from './modal';

describe('<Modal>', () => {
  it('renders given content with dialog role', () => {
    render(
      <Modal>
        <div data-testid="test-element">Hello</div>
      </Modal>
    );
    const dialogElt = screen.getByRole('dialog');
    const contentElt = screen.getByTestId('test-element');
    expect(dialogElt).toContainElement(contentElt);
  });
});
