import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Setting } from './setting';

describe('<Setting>', () => {
  it('renders given title as heading', () => {
    const props = {
      title: 'hello',
      options: [],
      onChange: () => {
        return;
      },
    };
    render(<Setting {...props} />);
    expect(screen.getByRole('heading', { name: 'hello' })).toBeInTheDocument();
  });

  it('renders given options as radio', () => {
    const props = {
      title: 'hello',
      options: ['opt1', 'opt2'],
      onChange: () => {
        return;
      },
    };
    render(<Setting {...props} />);
    const options = screen.getAllByRole('radio');
    expect(options).toHaveLength(2);
    expect(options[0]).toHaveAccessibleName('opt1');
    expect(options[1]).toHaveAccessibleName('opt2');
  });

  it('initially selects given initial option', () => {
    const props = {
      title: 'hello',
      options: ['opt1', 'opt2'],
      initialOption: 'opt2',
      onChange: () => {
        return;
      },
    };
    render(<Setting {...props} />);
    expect(screen.getByRole('radio', { name: 'opt1' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'opt2' })).toBeChecked();
  });

  it('initially selects no option given no initial option', () => {
    const props = {
      title: 'hello',
      options: ['opt1', 'opt2'],
      onChange: () => {
        return;
      },
    };
    render(<Setting {...props} />);
    expect(screen.getByRole('radio', { name: 'opt1' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'opt2' })).not.toBeChecked();
  });

  it('triggers callback with selected option', async () => {
    const user = userEvent.setup();
    const props = { title: 'hello', options: ['opt1', 'opt2'], onChange: vi.fn() };
    render(<Setting {...props} />);
    await user.click(screen.getByRole('radio', { name: 'opt2' }));
    expect(props.onChange).toHaveBeenNthCalledWith(1, 'opt2');
  });
});
