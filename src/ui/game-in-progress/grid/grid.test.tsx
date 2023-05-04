import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Grid } from './grid';

describe('<Grid>', () => {
  it('renders grid, row and gridcell roles', () => {
    render(
      <Grid
        data={[
          [{ txtValue: '1' }, { txtValue: '2' }],
          [{ txtValue: '1' }, { txtValue: '2' }],
        ]}
        onTileClick={() => null}
      />
    );
    expect(screen.getByRole('grid')).toBeInTheDocument();
    expect(screen.getAllByRole('row')).toHaveLength(2);
    expect(screen.getAllByRole('gridcell')).toHaveLength(4);
  });

  it('renders tile content given tile turned over', () => {
    render(<Grid data={[[{ txtValue: '1', isTurnedOver: true }]]} onTileClick={() => null} />);
    const tileElt = screen.getByRole('gridcell');
    const contentElt = screen.getByText('1');
    expect(tileElt).toContainElement(contentElt);
  });

  it('renders tile empty button given tile face down', () => {
    render(<Grid data={[[{ txtValue: '1', isTurnedOver: false }]]} onTileClick={() => null} />);
    const tileElt = screen.getByRole('gridcell');
    const buttonElt = screen.getByRole('button');
    expect(buttonElt).toBeEmptyDOMElement();
    expect(tileElt).toContainElement(buttonElt);
    expect(screen.queryByText('1')).not.toBeInTheDocument();
  });

  it('triggers callback with tile position', async () => {
    const user = userEvent.setup();
    const onTileClick = vi.fn();
    render(
      <Grid
        data={[
          [{ txtValue: '1' }, { txtValue: '2' }],
          [{ txtValue: '3' }, { txtValue: '4' }],
        ]}
        onTileClick={onTileClick}
      />
    );
    await user.click(screen.getAllByRole('button')[3]);
    expect(onTileClick).toHaveBeenNthCalledWith(1, 1, 1);
  });
});
