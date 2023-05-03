import { useState } from 'react';
import { Button, Modal } from '@/ui/shared';
import styles from './mobile-menu.module.css';

type MenuProps = {
  restart: () => void;
  newGame: () => void;
};

export const MobileMenu = ({ restart, newGame }: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleChoice = (choice: 'restart' | 'new' | 'resume') => {
    setIsOpen(false);
    switch (choice) {
      case 'restart':
        restart();
        break;
      case 'new':
        newGame();
        break;
    }
  };
  return (
    <>
      <Button label="Menu" variant="small" onClick={() => setIsOpen(true)} />
      {isOpen && (
        <Modal className={styles.container}>
          <Button label="Restart" variant="primary" onClick={() => handleChoice('restart')} />
          <Button label="New Game" variant="secondary" onClick={() => handleChoice('new')} />
          <Button label="Resume Game" variant="secondary" onClick={() => handleChoice('resume')} />
        </Modal>
      )}
    </>
  );
};
