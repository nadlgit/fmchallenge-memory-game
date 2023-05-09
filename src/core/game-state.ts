export const gridItemValues = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
] as const;

export type GameState = {
  grid: {
    value: (typeof gridItemValues)[number];
    isTurnedOver: boolean;
  }[][];
  playerPairs: number[];
  activePlayerIndex: number;
  moves: number;
};
