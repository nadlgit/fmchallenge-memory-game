import { game } from '@/core/entities';

type Position = { r: number; c: number };

export const makeMove = (position1: Position, position2: Position) => {
  const item1 = game.grid[position1.r][position1.c];
  const item2 = game.grid[position2.r][position2.c];
  if (!item1.isTurnedOver && !item2.isTurnedOver) {
    resetJustMatched();
    if (item1.value === item2.value) {
      updateMatchItem(item1);
      updateMatchItem(item2);
      game.playerPairs[game.activePlayerIndex]++;
    }
    switchActivePlayer();
    game.moves++;
  }
  game.notifyUpdate();
};

const resetJustMatched = () => {
  game.grid.forEach((row) => row.forEach((item) => (item.justMatched = false)));
};

const updateMatchItem = (item: (typeof game.grid)[number][number]) => {
  item.isTurnedOver = true;
  item.justMatched = true;
};

const switchActivePlayer = () => {
  if (game.grid.some((row) => row.some(({ isTurnedOver }) => !isTurnedOver))) {
    game.activePlayerIndex =
      game.activePlayerIndex < game.playerPairs.length - 1 ? game.activePlayerIndex + 1 : 0;
  }
};
