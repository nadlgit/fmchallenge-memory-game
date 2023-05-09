import { game } from './game';
import { type GameState } from './game-state';

export const onStateUpdate = (callback: (state: GameState) => void) =>
  game.registerUpdateCallback(callback);
