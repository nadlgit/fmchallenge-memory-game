import { CallbackHandler } from './callback-handler';
import { type GameState } from './game-state';

const callbackHandler = new CallbackHandler<GameState>();

export const game: Omit<GameState, 'isEndGame'> & {
  registerUpdateCallback: (callback: (state: GameState) => void) => () => void;
  notifyUpdate: () => void;
  isEndGame: () => boolean;
} = {
  grid: [],
  playerPairs: [],
  activePlayerIndex: 0,
  moves: 0,

  registerUpdateCallback: (callback) => callbackHandler.registerCallback(callback),

  notifyUpdate: () => {
    const { grid, playerPairs, activePlayerIndex, moves } = game;
    callbackHandler.notifyState({
      grid: grid.map((row) => row.map((item) => ({ ...item }))),
      playerPairs: [...playerPairs],
      activePlayerIndex,
      moves,
      isEndGame: game.isEndGame(),
    });
  },

  isEndGame: () => game.grid.every((row) => row.every(({ isTurnedOver }) => isTurnedOver)),
};
