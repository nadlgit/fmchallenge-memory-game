import { createContext, type PropsWithChildren, useCallback, useEffect, useState } from 'react';
import {
  type GameState,
  type GridSize,
  onStateUpdate,
  onTimerUpdate,
  restartGame as coreRestartGame,
  startNewGame,
  startTimer,
  stopTimer,
} from '@/core';

type GameContextValue = {
  isSettingsScreen: boolean;
  isIconTheme: boolean;
  playerPairs: GameState['playerPairs'];
  activePlayerIndex: GameState['activePlayerIndex'];
  moves: GameState['moves'];
  secondsElapsed: number;
  isEndGame: GameState['isEndGame'];
  createGame: (iconTheme: boolean, nbPlayers: number, gridSize: GridSize) => void;
  restartGame: () => void;
  showSettingsScreen: () => void;
};
export const GameContext = createContext<GameContextValue | undefined>(undefined);

export const GameProvider = ({ children }: PropsWithChildren) => {
  const [isSettingsScreen, setIsSettingsScreen] =
    useState<GameContextValue['isSettingsScreen']>(true);
  const [isIconTheme, setIsIconTheme] = useState<GameContextValue['isIconTheme']>(false);
  const [playerPairs, setPlayerPairs] = useState<GameContextValue['playerPairs']>([]);
  const [activePlayerIndex, setActivePlayerIndex] =
    useState<GameContextValue['activePlayerIndex']>(0);
  const [moves, setMoves] = useState<GameContextValue['moves']>(0);
  const [secondsElapsed, setSecondsElapsed] = useState<GameContextValue['secondsElapsed']>(0);
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
      setPlayerPairs(state.playerPairs);
      setActivePlayerIndex(state.activePlayerIndex);
      setMoves(state.moves);
      setIsEndGame(state.isEndGame);
      if (state.isEndGame) {
        stopTimer();
      }
    });
    const unregisterTimerUpdate = onTimerUpdate((secondsElapsed) => {
      setSecondsElapsed(secondsElapsed);
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
        playerPairs,
        activePlayerIndex,
        moves,
        secondsElapsed,
        isEndGame,
        createGame,
        restartGame,
        showSettingsScreen,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
