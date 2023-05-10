import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAnchor,
  faBomb,
  faBug,
  faCar,
  faDroplet,
  faFlag,
  faFlask,
  faGhost,
  faHandSpock,
  faHeart,
  faHouse,
  faMoon,
  faMusic,
  faPaw,
  faPencil,
  faSnowflake,
  faSun,
  faWandSparkles,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { type GridItemValue } from '@/core';

const icons: Record<GridItemValue, IconDefinition> = {
  '1': faAnchor,
  '2': faFlask,
  '3': faSun,
  '4': faHandSpock,
  '5': faBug,
  '6': faSnowflake,
  '7': faCar,
  '8': faHouse,
  '9': faMusic,
  '10': faDroplet,
  '11': faPencil,
  '12': faHeart,
  '13': faWandSparkles,
  '14': faGhost,
  '15': faBomb,
  '16': faFlag,
  '17': faMoon,
  '18': faPaw,
};

type TileContentProps = {
  value: GridItemValue;
  asIcon?: boolean;
};

export const TileContent = ({ value, asIcon }: TileContentProps) =>
  asIcon && Object.keys(icons).includes(value) ? (
    <FontAwesomeIcon icon={icons[value]} title={value} />
  ) : (
    <>{value}</>
  );
