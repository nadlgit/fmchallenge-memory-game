import styles from './button.module.css';

type ButtonProps = {
  variant: 'big' | 'primary' | 'secondary';
  fullWidth?: boolean;
  label: string;
  onClick: () => void;
};

export const Button = ({ variant, fullWidth = false, label, onClick }: ButtonProps) => (
  <button
    className={`${styles.button} ${styles[variant]} ${fullWidth ? styles.fullwidth : ''}`}
    onClick={onClick}
  >
    {label}
  </button>
);
