import { game } from './game';
import { type GameState } from './game-state';
import { onStateUpdate } from './on-state-update';

describe('onStateUpdate()', () => {
  it('registers callback', () => {
    const callback = vi.fn();
    onStateUpdate(callback);
    game.notifyUpdate();
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith({
      grid: game.grid,
      playerPairs: game.playerPairs,
      activePlayerIndex: game.activePlayerIndex,
      moves: game.moves,
    });
  });

  it('returns unregister function', () => {
    const callback = vi.fn();
    const unregister = onStateUpdate(callback);
    unregister();
    game.notifyUpdate();
    expect(callback).not.toHaveBeenCalled();
  });

  it('callback is provided game state deep clone', () => {
    let gameState = {} as GameState;
    const callback = vi.fn((state) => {
      gameState = state;
    });
    onStateUpdate(callback);
    game.notifyUpdate();
    expect(gameState).toEqual({
      grid: game.grid,
      playerPairs: game.playerPairs,
      activePlayerIndex: game.activePlayerIndex,
      moves: game.moves,
    });
    expect(gameState.grid).not.toBe(game.grid);
    expect(gameState.playerPairs).not.toBe(game.playerPairs);
  });
});
