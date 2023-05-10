import { game } from '@/core/entities';

type Position = { r: number; c: number };

export const makeMove = (position1: Position, position2: Position) => {
  const item1 = game.grid[position1.r][position1.c];
  const item2 = game.grid[position2.r][position2.c];

  if (item1.isTurnedOver || item2.isTurnedOver) {
    return;
  }

  if (item1.value === item2.value) {
    item1.isTurnedOver = true;
    item2.isTurnedOver = true;
    game.playerPairs[game.activePlayerIndex]++;
  }
  switchActivePlayer();
  game.moves++;
};

const switchActivePlayer = () => {
  if (game.grid.some((row) => row.some(({ isTurnedOver }) => !isTurnedOver))) {
    game.activePlayerIndex =
      game.activePlayerIndex < game.playerPairs.length - 1 ? game.activePlayerIndex + 1 : 0;
  }
};
