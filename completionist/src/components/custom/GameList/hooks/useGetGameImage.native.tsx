import { ImageURISource } from 'react-native';
import { GameKeyEnum } from '@utils/CustomEnums';

const useGetGameImage = () => {
  const getGameImage = (game: GameKeyEnum): ImageURISource => {
    switch (game) {
      case GameKeyEnum.SKYRIM:
        return require('@styles/images/games/skyrim.jpg');
      case GameKeyEnum.FALLOUT_4:
       return require('@styles/images/games/fallout4.jpg');
      default:
				// TODO: Change this to 'No image'
        return require('@styles/images/games/fallout4.jpg');
    }
  };

  return { getGameImage };
};

export default useGetGameImage;