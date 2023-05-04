import { TileContent } from './tile-content';
import styles from './grid.module.css';

type GridProps = {
  data: { txtValue: string; isTurnedOver?: boolean; isHighlighted?: boolean }[][];
  withIcons?: boolean;
  onTileClick: (rowIndex: number, columnIndex: number) => void;
};

export const Grid = ({ data, withIcons, onTileClick }: GridProps) => (
  <div role="grid" className={styles.grid} data-tilesize={data.length > 4 ? 'small' : 'large'}>
    {data.map((row, rowIndex) => (
      <div key={'row' + rowIndex} role="row" className={styles.row}>
        {row.map(({ txtValue, isTurnedOver, isHighlighted }, columnIndex) => (
          <div
            key={'col' + columnIndex}
            role="gridcell"
            className={`${styles.tile} ${isTurnedOver ? styles.tilevisible : styles.tilehidden} ${
              isHighlighted ? styles.tilehighlighted : ''
            }`.trim()}
          >
            {isTurnedOver ? (
              <TileContent txtValue={txtValue} asIcon={withIcons} />
            ) : (
              <button onClick={() => onTileClick(rowIndex, columnIndex)} />
            )}
          </div>
        ))}
      </div>
    ))}
  </div>
);
