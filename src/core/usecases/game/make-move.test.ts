import { game, type GameState } from '@/core/entities';
import { makeMove } from './make-move';

describe('makeMove()', () => {
  const initialState: Omit<GameState, 'isEndGame'> = {
    grid: [
      [
        { value: '1', isTurnedOver: false, justMatched: false },
        { value: '3', isTurnedOver: true, justMatched: false },
        { value: '2', isTurnedOver: true, justMatched: true },
        { value: '2', isTurnedOver: true, justMatched: true },
      ],
      [
        { value: '3', isTurnedOver: true, justMatched: false },
        { value: '1', isTurnedOver: false, justMatched: false },
        { value: '4', isTurnedOver: false, justMatched: false },
        { value: '4', isTurnedOver: false, justMatched: false },
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
    const move = matchMove;
    makeMove(...move);
    for (const { isTurnedOver } of move.map(({ r, c }) => game.grid[r][c])) {
      expect(isTurnedOver).toBeTrue();
    }
  });

  it('unsets previous just matched items', () => {
    makeMove(...noMatchMove);
    for (let r = 0; r < game.grid.length; r++) {
      for (let c = 0; c < game.grid[r].length; c++) {
        if (initialState.grid[r][c].justMatched) {
          expect(game.grid[r][c].justMatched).toBeFalse();
        }
      }
    }
  });

  it('keeps move items not just matched given no match', () => {
    const move = noMatchMove;
    makeMove(...noMatchMove);
    for (const { justMatched } of move.map(({ r, c }) => game.grid[r][c])) {
      expect(justMatched).toBeFalse();
    }
  });

  it('sets move items just matched given match', () => {
    const move = matchMove;
    makeMove(...move);
    for (const { justMatched } of move.map(({ r, c }) => game.grid[r][c])) {
      expect(justMatched).toBeTrue();
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

  it('triggers game update callback', () => {
    const callback = vi.fn();
    game.registerUpdateCallback(callback);
    makeMove(...noMatchMove);
    expect(callback).toHaveBeenCalled();
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

  it('triggers game update callback given move with already turned over item', () => {
    const callback = vi.fn();
    game.registerUpdateCallback(callback);
    makeMove(...invalidMove);
    expect(callback).toHaveBeenCalled();
  });

  it('keeps active player given move is last match', () => {
    game.grid = [
      [
        { value: '1', isTurnedOver: false, justMatched: false },
        { value: '3', isTurnedOver: true, justMatched: false },
        { value: '2', isTurnedOver: true, justMatched: true },
        { value: '2', isTurnedOver: true, justMatched: true },
      ],
      [
        { value: '3', isTurnedOver: true, justMatched: false },
        { value: '1', isTurnedOver: false, justMatched: false },
        { value: '4', isTurnedOver: true, justMatched: false },
        { value: '4', isTurnedOver: true, justMatched: false },
      ],
    ];
    makeMove({ r: 0, c: 0 }, { r: 1, c: 1 });
    expect(game.activePlayerIndex).toBe(initialState.activePlayerIndex);
  });
});
