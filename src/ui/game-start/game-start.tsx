import { useState } from 'react';
import { type GridSize } from '@/core';
import { Button, Logo, useGame } from '@/ui/shared';
import { Setting } from './setting';
import styles from './game-start.module.css';

const initialSettings = {
  theme: 'Numbers',
  nbPlayers: '1',
  gridSize: '4x4' as GridSize,
};

export const GameStart = () => {
  const { createGame } = useGame();
  const [settings, setSettings] = useState(initialSettings);
  return (
    <div className={styles.container}>
      <header>
        <Logo variant="home" />
      </header>
      <main className={styles.main}>
        <Setting
          title="Select Theme"
          options={['Numbers', 'Icons']}
          initialOption={initialSettings.theme}
          onChange={(option) => setSettings((s) => ({ ...s, theme: option }))}
        />
        <Setting
          title="Numbers of Players"
          options={['1', '2', '3', '4']}
          initialOption={initialSettings.nbPlayers}
          onChange={(option) => setSettings((s) => ({ ...s, nbPlayers: option }))}
        />
        <Setting
          title="Grid Size"
          options={['4x4', '6x6']}
          initialOption={initialSettings.gridSize}
          onChange={(option) => setSettings((s) => ({ ...s, gridSize: option as GridSize }))}
        />
        <Button
          label="Start Game"
          variant="big"
          onClick={() =>
            createGame(
              settings.theme === 'Icons',
              Number.parseInt(settings.nbPlayers),
              settings.gridSize
            )
          }
        />
      </main>
    </div>
  );
};
