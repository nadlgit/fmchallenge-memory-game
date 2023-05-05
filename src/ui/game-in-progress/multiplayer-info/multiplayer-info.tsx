import { useMediaQuery } from '@/ui/shared';
import styles from './multiplayer.module.css';

type MultiplayerInfoProps = { playerScores: number[]; playerIndex: number };

export const MultiplayerInfo = ({ playerScores, playerIndex }: MultiplayerInfoProps) => {
  const isMobile = useMediaQuery(`(max-width: 35.49rem)`);
  return (
    <div className={styles.container}>
      {playerScores.map((score, idx) => (
        <div
          key={`player${idx + 1}`}
          className={styles.info}
          data-currentplayer={playerIndex === idx ? 'true' : undefined}
        >
          <span className={styles.label}>{`${isMobile ? 'P' : 'Player '}${idx + 1}`}</span>
          <span className={styles.value}>{score}</span>
        </div>
      ))}
    </div>
  );
};
