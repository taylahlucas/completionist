import useMainState from '@redux/hooks/useMainState';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';

const useCheckSectionEnabled = () => {
  const { selectedGame, user } = useMainState();

  const checkIsSectionEnabled = (section: string) => {
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        return user.data.skyrim.settingsConfig.find(config => config.section === section && config.category === "")?.isActive ?? false
      case SubscriptionTypeEnum.FALLOUT_4:
        return user.data.fallout4.settingsConfig.find(config => config.section === section && config.category === "")?.isActive ?? false
      default:
        return false
    }
  };

  return { checkIsSectionEnabled }
};

export default useCheckSectionEnabled;