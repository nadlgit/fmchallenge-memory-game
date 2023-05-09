import styles from './button.module.css';

type ButtonProps = {
  variant: 'big' | 'primary' | 'secondary' | 'small';
  label: string;
  onClick: () => void;
};

export const Button = ({ variant, label, onClick }: ButtonProps) => {
  const classes = [styles.button];
  variant !== 'primary' && classes.push(styles[variant]);
  return (
    <button className={classes.join(' ')} onClick={onClick}>
      {label}
    </button>
  );
};
