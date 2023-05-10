import { Button, Modal, useGame } from '@/ui/shared';
import styles from './game-end.module.css';

export const GameEnd = () => {
  const { playerPairs, moves, timeElapsed, restartGame, showSettingsScreen } = useGame();
  const isMultiplayer = playerPairs.length > 1;
  const playerResults = playerPairs
    .map((pairs, idx) => ({ name: `Player ${idx + 1}`, pairs }))
    .sort((a, b) => b.pairs - a.pairs);
  const maxPairs = playerPairs.reduce((acc, curr) => Math.max(acc, curr), 0);
  const winners = playerResults.filter(({ pairs }) => pairs === maxPairs).map(({ name }) => name);
  const multiplayerHeading = winners.length === 1 ? `${winners[0]} Wins!` : 'It’s a tie!';
  const multiplayerSubheading = 'Game over! Here are the results…';
  const soloHeading = 'You did it!';
  const soloSubheading = 'Game over! Here’s how you got on…';
  return (
    <Modal className={styles.container}>
      <div className={styles.heading}>{isMultiplayer ? multiplayerHeading : soloHeading}</div>
      <div className={styles.subheading}>
        {isMultiplayer ? multiplayerSubheading : soloSubheading}
      </div>
      {isMultiplayer ? (
        <>
          {playerResults.map(({ name, pairs }) => (
            <Detail
              key={name}
              label={name}
              value={`${pairs} Pairs`}
              isHighlighted={winners.includes(name)}
            />
          ))}
        </>
      ) : (
        <>
          <Detail label="Time Elapsed" value={timeElapsed} />
          <Detail label="Moves Taken" value={`${moves} Moves`} />
        </>
      )}
      <div className={styles.buttons}>
        <Button label="Restart" variant="primary" onClick={restartGame} />
        <Button label="Setup New Game" variant="secondary" onClick={showSettingsScreen} />
      </div>
    </Modal>
  );
};

type DetailProps = { label: string; value: string; isHighlighted?: boolean };
const Detail = ({ label, value, isHighlighted }: DetailProps) => (
  <div className={`${styles.detail} ${isHighlighted ? styles.highlighted : ''}`.trim()}>
    <span className={styles.label}>{label}</span>
    <span className={styles.value}>{value}</span>
  </div>
);
