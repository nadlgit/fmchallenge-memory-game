import { type GameState } from './game-state';

const gameUpdateCallbacks: Record<number, (state: GameState) => void> = {};
let nextCallbackId = 1;

export const game: Omit<GameState, 'isEndGame'> & {
  registerUpdateCallback: (callback: (state: GameState) => void) => () => void;
  notifyUpdate: () => void;
  isEndGame: () => boolean;
} = {
  grid: [],
  playerPairs: [],
  activePlayerIndex: 0,
  moves: 0,

  registerUpdateCallback: (callback) => {
    const callbackId = nextCallbackId;
    gameUpdateCallbacks[callbackId] = callback;
    nextCallbackId++;
    return () => {
      delete gameUpdateCallbacks[callbackId];
    };
  },

  notifyUpdate: () => {
    const { grid, playerPairs, activePlayerIndex, moves } = game;
    for (const callback of Object.values(gameUpdateCallbacks)) {
      callback({
        grid: grid.map((row) => row.map((item) => ({ ...item }))),
        playerPairs: [...playerPairs],
        activePlayerIndex,
        moves,
        isEndGame: game.isEndGame(),
      });
    }
  },

  isEndGame: () => game.grid.every((row) => row.every(({ isTurnedOver }) => isTurnedOver)),
};