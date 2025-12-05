import { GameKey } from '@api/';
import { ImageURISource } from 'react-native';

export const getGameImage = (game: GameKey): ImageURISource => {
  switch (game) {
    case GameKey.eldenRing:
      return require('@styles/images/games/eldenring.jpg');
    case GameKey.fallout3:
      return require('@styles/images/games/fallout3.jpg');
    case GameKey.fallout4:
      return require('@styles/images/games/fallout4.jpg');
    case GameKey.skyrim:
      return require('@styles/images/games/skyrim.jpg');
    case GameKey.witcher3:
      return require('@styles/images/games/witcher3.jpeg');
    default:
      // TODO: Change this to 'No image'
      return require('@styles/images/games/fallout4.jpg');
  }
};
