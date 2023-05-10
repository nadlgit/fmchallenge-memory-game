import { createContext, type PropsWithChildren, useCallback, useEffect, useState } from 'react';
import {
  type GameState,
  type GridSize,
  makeMove,
  onStateUpdate,
  onTimerUpdate,
  restartGame as coreRestartGame,
  startNewGame,
  startTimer,
  stopTimer,
} from '@/core';
import { formatTimeElapsed } from './format-time-elapsed';

type GameContextValue = {
  isSettingsScreen: boolean;
  isIconTheme: boolean;
  grid: GameState['grid'];
  playerPairs: GameState['playerPairs'];
  activePlayerIndex: GameState['activePlayerIndex'];
  moves: GameState['moves'];
  timeElapsed: string;
  isEndGame: GameState['isEndGame'];
  createGame: (iconTheme: boolean, nbPlayers: number, gridSize: GridSize) => void;
  restartGame: () => void;
  showSettingsScreen: () => void;
  makeMove: typeof makeMove;
};
export const GameContext = createContext<GameContextValue | undefined>(undefined);

export const GameProvider = ({ children }: PropsWithChildren) => {
  const [isSettingsScreen, setIsSettingsScreen] =
    useState<GameContextValue['isSettingsScreen']>(true);
  const [isIconTheme, setIsIconTheme] = useState<GameContextValue['isIconTheme']>(false);
  const [grid, setGrid] = useState<GameContextValue['grid']>([]);
  const [playerPairs, setPlayerPairs] = useState<GameContextValue['playerPairs']>([]);
  const [activePlayerIndex, setActivePlayerIndex] =
    useState<GameContextValue['activePlayerIndex']>(0);
  const [moves, setMoves] = useState<GameContextValue['moves']>(0);
  const [timeElapsed, setTimeElapsed] = useState<GameContextValue['timeElapsed']>(
    formatTimeElapsed(0)
  );
  const [isEndGame, setIsEndGame] = useState<GameContextValue['isEndGame']>(false);

  const createGame: GameContextValue['createGame'] = useCallback(
    (iconTheme, nbPlayers, gridSize) => {
      setIsSettingsScreen(false);
      setIsIconTheme(iconTheme);
      startNewGame({ gridSize, nbPlayers });
      stopTimer();
      if (nbPlayers === 1) {
        startTimer();
      }
    },
    []
  );

  const restartGame: GameContextValue['restartGame'] = useCallback(() => {
    coreRestartGame();
    stopTimer();
    if (playerPairs.length === 1) {
      startTimer();
    }
  }, [playerPairs.length]);

  const showSettingsScreen: GameContextValue['showSettingsScreen'] = useCallback(() => {
    setIsSettingsScreen(true);
  }, []);

  useEffect(() => {
    const unregisterStateUpdate = onStateUpdate((state) => {
      setGrid(state.grid);
      setPlayerPairs(state.playerPairs);
      setActivePlayerIndex(state.activePlayerIndex);
      setMoves(state.moves);
      setIsEndGame(state.isEndGame);
      if (state.isEndGame) {
        stopTimer();
      }
    });
    const unregisterTimerUpdate = onTimerUpdate((secondsElapsed) => {
      setTimeElapsed(formatTimeElapsed(secondsElapsed));
    });
    return () => {
      stopTimer();
      unregisterStateUpdate();
      unregisterTimerUpdate();
    };
  }, []);

  return (
    <GameContext.Provider
      value={{
        isSettingsScreen,
        isIconTheme,
        grid,
        playerPairs,
        activePlayerIndex,
        moves,
        timeElapsed,
        isEndGame,
        createGame,
        restartGame,
        showSettingsScreen,
        makeMove,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
