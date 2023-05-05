import styles from './solo-info.module.css';

type SoloInfoProps = { timeElapsed: string; moves: number };

export const SoloInfo = ({ timeElapsed, moves }: SoloInfoProps) => (
  <div className={styles.container}>
    <div className={styles.info}>
      <span className={styles.label}>Time</span>
      <span className={styles.value}>{timeElapsed}</span>
    </div>
    <div className={styles.info}>
      <span className={styles.label}>Moves</span>
      <span className={styles.value}>{moves}</span>
    </div>
  </div>
);
