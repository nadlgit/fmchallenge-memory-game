import styles from './logo.module.css';

type LogoProps = {
  variant: 'home' | 'header';
};

export const Logo = ({ variant }: LogoProps) => <h1 className={styles[variant]}>memory</h1>;
