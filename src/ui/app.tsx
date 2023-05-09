import { GameEnd } from '@/ui/game-end';
import { GameInProgress } from '@/ui/game-in-progress';
import { GameStart } from '@/ui/game-start';
import { GameProvider, useGame } from '@/ui/shared';

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

const AppContent = () => {
  const { isSettingsScreen, isEndGame } = useGame();
  return isSettingsScreen ? (
    <GameStart />
  ) : (
    <>
      <GameInProgress />
      {isEndGame && <GameEnd />}
    </>
  );
};
