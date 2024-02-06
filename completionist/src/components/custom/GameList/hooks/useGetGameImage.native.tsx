import { ImageURISource } from 'react-native';
import { GameKeyEnum } from '@utils/CustomEnums';

const useGetGameImage = () => {
  const getGameImage = (game: GameKeyEnum): ImageURISource => {
    switch (game) {
      case GameKeyEnum.SKYRIM:
        return require('@styles/images/skyrim.jpg');
      case GameKeyEnum.FALLOUT_4:
       return require('@styles/images/fallout4.jpg');
      default:
        return require('@styles/images/fallout4.jpg');
    }
  };

  return { getGameImage };
};

export default useGetGameImage;