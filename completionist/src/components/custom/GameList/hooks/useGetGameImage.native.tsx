import { ImageURISource } from 'react-native';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';

const useGetGameImage = () => {
  const getGameImage = (game: SubscriptionTypeEnum): ImageURISource => {
    switch (game) {
      case SubscriptionTypeEnum.SKYRIM:
        return require('@styles/images/skyrim.jpg');
      case SubscriptionTypeEnum.FALLOUT_4:
       return require('@styles/images/fallout4.jpg');
      default:
        return require('@styles/images/fallout4.jpg');
    }
  };

  return { getGameImage };
};

export default useGetGameImage;