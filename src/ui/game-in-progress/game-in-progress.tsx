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

  //TODO: refactor
  const [gridData, setGridData] = useState<GridProps['data']>(grid);
  const [move, setMove] = useState<{ r: number; c: number }[]>([]);
  const handleTileClick = (r: number, c: number) => {
    setMove((m) => [...m, { r, c }]);
    setGridData((g) =>
      g.map((row, rowIndex) =>
        row.map((item, columnIndex) => ({
          ...item,
          isTurnedOver: r === rowIndex && c === columnIndex ? true : item.isTurnedOver,
        }))
      )
    );
  };
  useEffect(() => {
    setGridData(grid);
    setMove([]);
  }, [grid]);
  useEffect(() => {
    if (move.length === 2) {
      makeMove(move[0], move[1]);
    }
  }, [move, makeMove]);
  //END TODO

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Logo variant="header" />
        <Menu restart={restartGame} newGame={showSettingsScreen} />
      </header>
      <main className={styles.main}>
        <Grid data={gridData} withIcons={isIconTheme} onTileClick={handleTileClick} />
        {playerPairs.length > 1 ? (
          <MultiplayerInfo playerScores={playerPairs} playerIndex={activePlayerIndex} />
        ) : (
          <SoloInfo timeElapsed={timeElapsed} moves={moves} />
        )}
      </main>
    </div>
  );
};
