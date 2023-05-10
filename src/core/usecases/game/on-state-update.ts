import { game, type GameState } from '@/core/entities';

export const onStateUpdate = (callback: (state: GameState) => void) =>
  game.registerUpdateCallback(callback);
