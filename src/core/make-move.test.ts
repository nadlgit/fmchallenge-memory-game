import { game } from './game';
import { type GameState } from './game-state';
import { makeMove } from './make-move';

describe('makeMove()', () => {
  const initialState: Omit<GameState, 'isEndGame'> = {
    grid: [
      [
        { value: '1', isTurnedOver: false },
        { value: '3', isTurnedOver: true },
        { value: '2', isTurnedOver: true },
        { value: '2', isTurnedOver: true },
      ],
      [
        { value: '3', isTurnedOver: true },
        { value: '1', isTurnedOver: false },
        { value: '4', isTurnedOver: false },
        { value: '4', isTurnedOver: false },
      ],
    ],
    playerPairs: [1, 1, 1, 1],
    activePlayerIndex: 1,
    moves: 3,
  };
  const noMatchMove = [
    { r: 0, c: 0 },
    { r: 1, c: 3 },
  ] as const;
  const matchMove = [
    { r: 0, c: 0 },
    { r: 1, c: 1 },
  ] as const;
  const invalidMove = [
    { r: 0, c: 0 },
    { r: 0, c: 1 },
  ] as const;

  beforeEach(() => {
    game.grid = initialState.grid.map((row) => row.map((item) => ({ ...item })));
    game.playerPairs = [...initialState.playerPairs];
    game.activePlayerIndex = initialState.activePlayerIndex;
    game.moves = initialState.moves;
  });

  it('sets move items turned over given match', () => {
    makeMove(...matchMove);
    const items = matchMove.map(({ r, c }) => game.grid[r][c]);
    for (const { isTurnedOver } of items) {
      expect(isTurnedOver).toBeTrue();
    }
  });

  it('keeps player pairs count given no match', () => {
    makeMove(...noMatchMove);
    for (let i = 0; i < game.playerPairs.length; i++) {
      expect(game.playerPairs[i]).toBe(initialState.playerPairs[i]);
    }
  });

  it('increments active player pairs count given match', () => {
    makeMove(...matchMove);
    for (let i = 0; i < game.playerPairs.length; i++) {
      const expected =
        i === initialState.activePlayerIndex
          ? initialState.playerPairs[i] + 1
          : initialState.playerPairs[i];
      expect(game.playerPairs[i]).toBe(expected);
    }
  });

  it('changes active player to second player given multiple players and first player was active', () => {
    game.activePlayerIndex = 0;
    makeMove(...noMatchMove);
    expect(game.activePlayerIndex).toBe(1);
  });

  it('changes active player to first player given multiple players and last player was active', () => {
    game.activePlayerIndex = 3;
    makeMove(...noMatchMove);
    expect(game.activePlayerIndex).toBe(0);
  });

  it('increments moves count', () => {
    makeMove(...noMatchMove);
    expect(game.moves).toBe(initialState.moves + 1);
  });

  it('keeps grid given move with already turned over item', () => {
    makeMove(...invalidMove);
    expect(game.grid).toEqual(initialState.grid);
  });

  it('keeps player pairs given move with already turned over item', () => {
    makeMove(...invalidMove);
    expect(game.playerPairs).toEqual(initialState.playerPairs);
  });

  it('keeps active player given move with already turned over item', () => {
    makeMove(...invalidMove);
    expect(game.activePlayerIndex).toBe(initialState.activePlayerIndex);
  });

  it('keeps moves count given move with already turned over item', () => {
    makeMove(...invalidMove);
    expect(game.moves).toBe(initialState.moves);
  });

  it('keeps active player given last match', () => {
    game.grid = [
      [
        { value: '1', isTurnedOver: false },
        { value: '3', isTurnedOver: true },
        { value: '2', isTurnedOver: true },
        { value: '2', isTurnedOver: true },
      ],
      [
        { value: '3', isTurnedOver: true },
        { value: '1', isTurnedOver: false },
        { value: '4', isTurnedOver: true },
        { value: '4', isTurnedOver: true },
      ],
    ];
    makeMove({ r: 0, c: 0 }, { r: 1, c: 1 });
    expect(game.activePlayerIndex).toBe(initialState.activePlayerIndex);
  });
});
