import { createContext, type PropsWithChildren, useEffect, useState } from 'react';
import { type GameState, onStateUpdate } from '@/core';

type GameContextValue = {
  isSettingsScreen: boolean;
  isEndGame: GameState['isEndGame'];
};
export const GameContext = createContext<GameContextValue | undefined>(undefined);

export const GameProvider = ({ children }: PropsWithChildren) => {
  const [isSettingsScreen] = useState<GameContextValue['isSettingsScreen']>(true);
  const [isEndGame, setIsEndGame] = useState<GameContextValue['isEndGame']>(false);

  useEffect(
    () =>
      onStateUpdate((state) => {
        setIsEndGame(state.isEndGame);
      }),
    []
  );

  return (
    <GameContext.Provider value={{ isSettingsScreen, isEndGame }}>{children}</GameContext.Provider>
  );
};
