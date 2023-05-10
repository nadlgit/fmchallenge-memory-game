import { useEffect, useState } from 'react';
import { Logo, useGame } from '@/ui/shared';
import { Grid, type GridProps } from './grid';
import { Menu } from './menu';
import { MultiplayerInfo } from './multiplayer-info';
import { SoloInfo } from './solo-info';
import styles from './game-in-progress.module.css';

export const GameInProgress = () => {
  const {
    isIconTheme,
    grid,
    playerPairs,
    activePlayerIndex,
    moves,
    timeElapsed,
    restartGame,
    showSettingsScreen,
    makeMove,
  } = useGame();

  const [data, setData] = useState<{
    grid: GridProps['data'];
    tilesClicked: { r: number; c: number }[];
  }>({ grid, tilesClicked: [] });

  const handleTileClick = (r: number, c: number) => {
    setData((prev) =>
      prev.tilesClicked.length < 2
        ? {
            grid: prev.grid.map((row, rowIndex) =>
              row.map((item, columnIndex) => ({
                ...item,
                isTurnedOver: (r === rowIndex && c === columnIndex) || item.isTurnedOver,
              }))
            ),
            tilesClicked: [...prev.tilesClicked, { r, c }],
          }
        : prev
    );
  };

  useEffect(() => {
    if (data.tilesClicked.length === 2) {
      setTimeout(() => {
        makeMove(data.tilesClicked[0], data.tilesClicked[1]);
      }, 200);
    }
  }, [data.tilesClicked, makeMove]);

  useEffect(() => {
    setData({ grid, tilesClicked: [] });
  }, [grid]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Logo variant="header" />
        <Menu restart={restartGame} newGame={showSettingsScreen} />
      </header>
      <main className={styles.main}>
        <Grid data={data.grid} withIcons={isIconTheme} onTileClick={handleTileClick} />
        {playerPairs.length > 1 ? (
          <MultiplayerInfo playerScores={playerPairs} playerIndex={activePlayerIndex} />
        ) : (
          <SoloInfo timeElapsed={timeElapsed} moves={moves} />
        )}
      </main>
    </div>
  );
};
