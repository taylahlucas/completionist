import { GameKeyEnum } from '@utils/index';
import { ImageURISource } from 'react-native';

export const getGameImage = (game: GameKeyEnum): ImageURISource => {
  switch (game) {
    case GameKeyEnum.ELDEN_RING:
      return require('@styles/images/games/eldenring.jpg');
    case GameKeyEnum.FALLOUT_3:
      return require('@styles/images/games/fallout3.jpg');
    case GameKeyEnum.FALLOUT_4:
      return require('@styles/images/games/fallout4.jpg');
    case GameKeyEnum.SKYRIM:
      return require('@styles/images/games/skyrim.jpg');
    case GameKeyEnum.WITCHER_3:
      return require('@styles/images/games/witcher3.jpeg');
    default:
      // TODO: Change this to 'No image'
      return require('@styles/images/games/fallout4.jpg');
  }
};
