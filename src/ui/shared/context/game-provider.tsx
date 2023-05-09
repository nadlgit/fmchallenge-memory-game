import { createContext, type PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { type GameState, type GridSize, onStateUpdate, startNewGame } from '@/core';

type GameContextValue = {
  isSettingsScreen: boolean;
  isIconTheme: boolean;
  isEndGame: GameState['isEndGame'];
  createGame: (iconTheme: boolean, nbPlayers: number, gridSize: GridSize) => void;
};
export const GameContext = createContext<GameContextValue | undefined>(undefined);

export const GameProvider = ({ children }: PropsWithChildren) => {
  const [isSettingsScreen, setIsSettingsScreen] =
    useState<GameContextValue['isSettingsScreen']>(true);
  const [isIconTheme, setIsIconTheme] = useState<GameContextValue['isIconTheme']>(false);
  const [isEndGame, setIsEndGame] = useState<GameContextValue['isEndGame']>(false);

  const createGame: GameContextValue['createGame'] = useCallback(
    (iconTheme, nbPlayers, gridSize) => {
      setIsSettingsScreen(false);
      setIsIconTheme(iconTheme);
      startNewGame({ gridSize, nbPlayers });
    },
    []
  );

  useEffect(
    () =>
      onStateUpdate((state) => {
        setIsEndGame(state.isEndGame);
      }),
    []
  );

  return (
    <GameContext.Provider value={{ isSettingsScreen, isIconTheme, isEndGame, createGame }}>
      {children}
    </GameContext.Provider>
  );
};
