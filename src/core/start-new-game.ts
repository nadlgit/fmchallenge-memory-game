import { game } from './game';
import { gridItemValues } from './game-state';

export type GridSize = '4x4' | '6x6';
type GameSettings = { gridSize: GridSize; nbPlayers: number };

export const startNewGame = ({ gridSize, nbPlayers }: GameSettings) => {
  game.grid = createGrid(gridSize);
  game.playerPairs = createPlayerPairs(nbPlayers);
  game.activePlayerIndex = 0;
  game.moves = 0;
  game.notifyUpdate();
};

const createGrid = (gridSize: GridSize) => {
  const sideLengthConfig = { '4x4': 4, '6x6': 6 };
  const sideLength = sideLengthConfig[gridSize];
  const distinctValues = gridItemValues.slice(0, (sideLength * sideLength) / 2);
  const values = [...distinctValues, ...distinctValues].sort(() => Math.random() - 0.5);
  const grid = [];
  for (let r = 0; r < sideLength; r++) {
    const row = [];
    for (let c = 0; c < sideLength; c++) {
      row.push({ value: values[r * sideLength + c], isTurnedOver: false });
    }
    grid.push(row);
  }
  return grid;
};

const createPlayerPairs = (nbPlayers: number) => {
  let length = nbPlayers;
  if (nbPlayers > 4) {
    length = 4;
  }
  if (nbPlayers < 1) {
    length = 1;
  }
  return new Array(length).fill(0);
};
