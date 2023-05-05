import { Button, Modal } from '@/ui/shared';
import styles from './game-end.module.css';

export const GameEnd = () => {
  const heading = "It's a tie!";
  const subheading = 'Game over! Here are the results...';
  return (
    <Modal className={styles.container}>
      <div className={styles.heading}>{heading}</div>
      <div className={styles.subheading}>{subheading}</div>
      <Detail label="Player 3 (Winner!)" value="6 Pairs" isHighlighted />
      <Detail label="Player 4" value="1 Pairs" />
      <Detail label="Time Elapsed" value="1:53" />
      <Detail label="Moves Taken" value="39 Moves" />
      <div className={styles.buttons}>
        <Button label="Restart" variant="primary" onClick={() => null} />
        <Button label="Setup New Game" variant="secondary" onClick={() => null} />
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
