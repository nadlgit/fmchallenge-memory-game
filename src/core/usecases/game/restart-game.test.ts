import { game, type GameState, type GridItemValue } from '@/core/entities';
import { restartGame } from './restart-game';

describe('restartGame()', () => {
  const initialState: Omit<GameState, 'isEndGame'> = {
    grid: [
      [
        { value: '1', isTurnedOver: true, justMatched: true },
        { value: '1', isTurnedOver: true, justMatched: true },
        { value: '2', isTurnedOver: true, justMatched: true },
        { value: '2', isTurnedOver: true, justMatched: true },
      ],
      [
        { value: '3', isTurnedOver: true, justMatched: true },
        { value: '3', isTurnedOver: true, justMatched: true },
        { value: '4', isTurnedOver: true, justMatched: true },
        { value: '4', isTurnedOver: true, justMatched: true },
      ],
      [
        { value: '5', isTurnedOver: true, justMatched: true },
        { value: '5', isTurnedOver: true, justMatched: true },
        { value: '6', isTurnedOver: true, justMatched: true },
        { value: '6', isTurnedOver: true, justMatched: true },
      ],
      [
        { value: '7', isTurnedOver: true, justMatched: true },
        { value: '7', isTurnedOver: true, justMatched: true },
        { value: '8', isTurnedOver: true, justMatched: true },
        { value: '8', isTurnedOver: true, justMatched: true },
      ],
    ],
    playerPairs: [7, 1],
    activePlayerIndex: 1,
    moves: 9,
  };

  beforeEach(() => {
    game.grid = initialState.grid.map((row) => row.map((item) => ({ ...item })));
    game.playerPairs = [...initialState.playerPairs];
    game.activePlayerIndex = initialState.activePlayerIndex;
    game.moves = initialState.moves;
  });

  it('keeps grid size', () => {
    const initialSideLength = initialState.grid.length;
    restartGame();
    expect(game.grid).toHaveLength(initialSideLength);
    for (const row of game.grid) {
      expect(row).toHaveLength(initialSideLength);
    }
  });

  it('sets grid with item pairs', () => {
    const initialPairsCount = (initialState.grid.length * initialState.grid.length) / 2;
    restartGame();
    const gridValues = game.grid.reduce((acc, curr) => {
      curr.forEach(({ value }) => {
        if (!acc[value]) {
          acc[value] = 0;
        }
        acc[value]++;
      });
      return acc;
    }, {} as Record<GridItemValue, number>);
    expect(Object.values(gridValues)).toIncludeSameMembers(new Array(initialPairsCount).fill(2));
  });

  it('sets grid items as not turned', () => {
    restartGame();
    for (const row of game.grid) {
      for (const { isTurnedOver } of row) {
        expect(isTurnedOver).toBeFalse();
      }
    }
  });

  it('sets grid items as not just matched', () => {
    restartGame();
    for (const row of game.grid) {
      for (const { justMatched } of row) {
        expect(justMatched).toBeFalse();
      }
    }
  });

  it('sets new grid values', () => {
    restartGame();
    expect(
      game.grid.some((row, r) =>
        row.some(({ value }, c) => value !== initialState.grid[r][c].value)
      )
    ).toBeTrue();
  });

  it('keeps number of player pairs', () => {
    const initialSideLengthSize = initialState.playerPairs.length;
    restartGame();
    expect(game.playerPairs).toHaveLength(initialSideLengthSize);
  });

  it('sets all player pairs to 0', () => {
    restartGame();
    for (const val of game.playerPairs) {
      expect(val).toBe(0);
    }
  });

  it('sets game active player to player 1', () => {
    restartGame();
    expect(game.activePlayerIndex).toBe(0);
  });

  it('sets game moves to 0', () => {
    restartGame();
    expect(game.moves).toBe(0);
  });

  it('triggers game update callback', () => {
    const callback = vi.fn();
    game.registerUpdateCallback(callback);
    restartGame();
    expect(callback).toHaveBeenCalled();
  });
});
