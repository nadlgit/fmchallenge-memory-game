import { Button } from '@/ui/shared';
import { MobileMenu } from './mobile-menu';
import { useMediaQuery } from './use-media-query';
import styles from './menu.module.css';

type MenuProps = {
  restart: () => void;
  newGame: () => void;
};

export const Menu = ({ restart, newGame }: MenuProps) => {
  const isMobile = useMediaQuery(`(max-width: 39.99rem)`);
  return isMobile ? (
    <MobileMenu restart={restart} newGame={newGame} />
  ) : (
    <div className={styles.menu}>
      <Button label="Restart" variant="primary" onClick={restart} />
      <Button label="New Game" variant="secondary" onClick={newGame} />
    </div>
  );
};
