import { GameEnd } from '@/ui/game-end';
import { GameInProgress } from '@/ui/game-in-progress';
import { GameStart } from '@/ui/game-start';
import { GameProvider, useGame } from '@/ui/shared';
import { ChallengeAttribution } from './challenge-attribution';
import styles from './app.module.css';

export const App = () => (
  <div className={styles.app}>
    <GameProvider>
      <AppContent />
    </GameProvider>
    <footer className={styles.attribution}>
      <ChallengeAttribution />
    </footer>
  </div>
);

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
