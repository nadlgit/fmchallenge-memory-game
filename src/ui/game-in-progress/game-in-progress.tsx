import { useEffect, useState } from 'react';
import { Logo } from '@/ui/shared';
import { Grid } from './grid';
import { Menu } from './menu';
import { MultiplayerInfo } from './multiplayer-info';
import { SoloInfo } from './solo-info';
import styles from './game-in-progress.module.css';

export const GameInProgress = () => {
  const [timeElapsed, setTimeElapsed] = useState('0:00');
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeElapsed(computeTimeElapsed(startTime));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Logo variant="header" />
        <Menu restart={() => null} newGame={() => null} />
      </header>
      <main className={styles.main}>
        <Grid data={gridData} onTileClick={() => null} />
        {playerScores.length > 1 ? (
          <MultiplayerInfo playerScores={playerScores} playerIndex={1} />
        ) : (
          <SoloInfo timeElapsed={timeElapsed} moves={39} />
        )}
      </main>
    </div>
  );
};

const gridData = [
  [
    { txtValue: '4', isTurnedOver: true, isHighlighted: true },
    { txtValue: '2', isTurnedOver: true },
    { txtValue: '16', isTurnedOver: true },
    { txtValue: '3' },
    { txtValue: '3' },
    { txtValue: '10' },
  ],
  [
    { txtValue: '10' },
    { txtValue: '11' },
    { txtValue: '16', isTurnedOver: true },
    { txtValue: '2', isTurnedOver: true },
    { txtValue: '5', isTurnedOver: true },
    { txtValue: '5', isTurnedOver: true },
  ],
  [
    { txtValue: '18', isTurnedOver: true },
    { txtValue: '8', isTurnedOver: true },
    { txtValue: '11' },
    { txtValue: '12' },
    { txtValue: '14', isTurnedOver: true },
    { txtValue: '12' },
  ],
  [
    { txtValue: '13' },
    { txtValue: '6' },
    { txtValue: '7' },
    { txtValue: '8', isTurnedOver: true },
    { txtValue: '1', isTurnedOver: true },
    { txtValue: '1', isTurnedOver: true },
  ],
  [
    { txtValue: '7' },
    { txtValue: '12', isTurnedOver: true },
    { txtValue: '9' },
    { txtValue: '12', isTurnedOver: true },
    { txtValue: '13' },
    { txtValue: '9' },
  ],
  [
    { txtValue: '17' },
    { txtValue: '18', isTurnedOver: true },
    { txtValue: '4', isTurnedOver: true, isHighlighted: true },
    { txtValue: '14', isTurnedOver: true },
    { txtValue: '17' },
    { txtValue: '6' },
  ],
];

const playerScores = [4, 4, 2, 0];

const computeTimeElapsed = (startTime: Date) => {
  const totalSeconds = Math.floor((Date.now() - startTime.getTime()) / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return minutes + ':' + seconds.toString().padStart(2, '0');
};

const startTime = new Date();
