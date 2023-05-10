import { game, type GridItemValue } from '@/core/entities';
import { startNewGame, type GridSize } from './start-new-game';

describe('startNewGame()', () => {
  beforeEach(() => {
    game.grid = [];
    game.playerPairs = [];
    game.activePlayerIndex = -1;
    game.moves = -1;
  });

  it.each([
    { gridSize: '4x4', length: 4 },
    { gridSize: '6x6', length: 6 },
  ] as { gridSize: GridSize; length: number }[])(
    'set grid size given $gridSize size',
    ({ gridSize, length }) => {
      startNewGame({ gridSize, nbPlayers: 1 });
      expect(game.grid).toHaveLength(length);
      for (const row of game.grid) {
        expect(row).toHaveLength(length);
      }
    }
  );

  it('sets grid with item pairs', () => {
    startNewGame({ gridSize: '4x4', nbPlayers: 1 });
    const gridValues = game.grid.reduce((acc, curr) => {
      curr.forEach(({ value }) => {
        if (!acc[value]) {
          acc[value] = 0;
        }
        acc[value]++;
      });
      return acc;
    }, {} as Record<GridItemValue, number>);
    expect(Object.values(gridValues)).toIncludeSameMembers(new Array(8).fill(2));
  });

  it('sets grid items as not turned', () => {
    startNewGame({ gridSize: '4x4', nbPlayers: 1 });
    for (const row of game.grid) {
      for (const { isTurnedOver } of row) {
        expect(isTurnedOver).toBeFalse();
      }
    }
  });

  it('sets grid items as not just matched', () => {
    startNewGame({ gridSize: '4x4', nbPlayers: 1 });
    for (const row of game.grid) {
      for (const { justMatched } of row) {
        expect(justMatched).toBeFalse();
      }
    }
  });

  it.each([1, 2, 3, 4])('sets same number of player pairs given %s player(s)', (nbPlayers) => {
    startNewGame({ gridSize: '4x4', nbPlayers });
    expect(game.playerPairs).toHaveLength(nbPlayers);
  });

  it('sets 4 pairs given number of players is higher', () => {
    startNewGame({ gridSize: '4x4', nbPlayers: 5 });
    expect(game.playerPairs).toHaveLength(4);
  });

  it('sets 1 pair given number of players is lower', () => {
    startNewGame({ gridSize: '4x4', nbPlayers: 0 });
    expect(game.playerPairs).toHaveLength(1);
  });

  it('sets all player pairs to 0', () => {
    startNewGame({ gridSize: '4x4', nbPlayers: 4 });
    expect(game.playerPairs).toEqual([0, 0, 0, 0]);
  });

  it('sets game active player to player 1', () => {
    startNewGame({ gridSize: '4x4', nbPlayers: 4 });
    expect(game.activePlayerIndex).toBe(0);
  });

  it('sets game moves to 0', () => {
    startNewGame({ gridSize: '4x4', nbPlayers: 4 });
    expect(game.moves).toBe(0);
  });

  it('triggers game update callback', () => {
    const callback = vi.fn();
    game.registerUpdateCallback(callback);
    startNewGame({ gridSize: '4x4', nbPlayers: 4 });
    expect(callback).toHaveBeenCalled();
  });
});
