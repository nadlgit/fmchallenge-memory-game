import { game } from '@/core/entities';

export const restartGame = () => {
  resetGrid();
  resetPlayerPairs();
  game.activePlayerIndex = 0;
  game.moves = 0;
  game.notifyUpdate();
};

const resetGrid = () => {
  const items = game.grid
    .flatMap((row) => row.map(({ value }) => ({ value, isTurnedOver: false })))
    .sort(() => Math.random() - 0.5);
  for (let r = 0; r < game.grid.length; r++) {
    for (let c = 0; c < game.grid[0].length; c++) {
      game.grid[r][c] = items[r * game.grid.length + c];
    }
  }
};

const resetPlayerPairs = () => {
  for (let i = 0; i < game.playerPairs.length; i++) {
    game.playerPairs[i] = 0;
  }
};
