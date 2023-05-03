import { Button, Logo } from '@/ui/shared';
import { Setting } from './setting';
import styles from './game-start.module.css';

export const GameStart = () => (
  <div className={styles.container}>
    <header>
      <Logo variant="home" />
    </header>
    <main className={styles.main}>
      <Setting
        title="Select Theme"
        options={['Numbers', 'Icons']}
        initialOption="Numbers"
        onChange={() => null}
      />
      <Setting
        title="Numbers of Players"
        options={['1', '2', '3', '4']}
        initialOption="1"
        onChange={() => null}
      />
      <Setting
        title="Grid Size"
        options={['4x4', '6x6']}
        initialOption="4x4"
        onChange={() => null}
      />
      <Button label="Start Game" variant="big" onClick={() => null} />
    </main>
  </div>
);
