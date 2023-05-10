import { Button, Modal, useGame } from '@/ui/shared';
import styles from './game-end.module.css';

export const GameEnd = () => {
  const { playerPairs, moves, timeElapsed, restartGame, showSettingsScreen } = useGame();

  const isMultiplayer = playerPairs.length > 1;
  const maxPairs = playerPairs.reduce((acc, curr) => Math.max(acc, curr), 0);
  const playerResults = playerPairs
    .map((pairs, idx) => ({ name: `Player ${idx + 1}`, pairs }))
    .sort((a, b) => b.pairs - a.pairs);
  const winners = playerResults.filter(({ pairs }) => pairs === maxPairs).map(({ name }) => name);

  const heading = isMultiplayer
    ? winners.length === 1
      ? `${winners[0]} Wins!`
      : 'It’s a tie!'
    : 'You did it!';
  const subheading = isMultiplayer
    ? 'Game over! Here are the results…'
    : 'Game over! Here’s how you got on…';
  const results = isMultiplayer
    ? playerResults.map(({ name, pairs }) => ({
        label: name,
        value: `${pairs} Pair${pairs > 1 ? 's' : ''}`,
        isHighlighted: winners.includes(name),
      }))
    : [
        { label: 'Time Elapsed', value: timeElapsed, isHighlighted: false },
        { label: 'Moves Taken', value: `${moves} Moves`, isHighlighted: false },
      ];
  return (
    <Modal className={styles.container}>
      <div className={styles.heading}>{heading}</div>
      <div className={styles.subheading}>{subheading}</div>
      {results.map(({ label, value, isHighlighted }) => (
        <div
          key={label}
          className={`${styles.detail} ${isHighlighted ? styles.highlighted : ''}`.trim()}
        >
          <span className={styles.label}>{label}</span>
          <span className={styles.value}>{value}</span>
        </div>
      ))}
      <div className={styles.buttons}>
        <Button label="Restart" variant="primary" onClick={restartGame} />
        <Button label="Setup New Game" variant="secondary" onClick={showSettingsScreen} />
      </div>
    </Modal>
  );
};
