import useMainState from '@redux/hooks/useMainState';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';
import { skyrimDLC, fallout4DLC } from '@utils/constants';
import { SettingsListItem } from '@utils/CustomInterfaces';
import useMainDispatch from '@redux/hooks/useMainDispatch';

interface DLCOptionsReturnType {
  useGetDLCOptions: () => SettingsListItem[];
  useSetDLCOptions: (title: string) => void;
}

const useDLCOptions = (): DLCOptionsReturnType => {
  const { setUser } = useMainDispatch();
  const { selectedGameSettings, user } = useMainState();

  const useGetDLCOptions = (): SettingsListItem[] => {
    switch (selectedGameSettings) {
      case SubscriptionTypeEnum.SKYRIM:
        return skyrimDLC.map((item, index) => {
          return {
            id: `${index}-${item}`,
            title: item,
            isActive: user.data.skyrim.settingsConfig.filter(config => config.category === item && config.isActive).length > 0
          }
        });
      case SubscriptionTypeEnum.FALLOUT_4:
        return fallout4DLC.map((item, index) => {
          return {
            id: `${index}-${item}`,
            title: item,
            isActive: user.data.fallout4.settingsConfig.filter(config => config.category === item && config.isActive).length > 0
          }
        });
    }
  };

  const useSetDLCOptions = (title: string) => {
    switch (selectedGameSettings) {
      case SubscriptionTypeEnum.SKYRIM:
        setUser({
          ...user,
          data: {
            ...user.data,
            skyrim: {
              ...user.data.skyrim,
              settingsConfig: user.data.skyrim.settingsConfig.map(config => {
                return {
                  ...config,
                  isActive: config.category === title ? !config.isActive : config.isActive
                }
              })
            }
          }
        });
        return;

      case SubscriptionTypeEnum.FALLOUT_4:
        setUser({
          ...user,
          data: {
            ...user.data,
            skyrim: {
              ...user.data.fallout4,
              settingsConfig: user.data.fallout4.settingsConfig.map(config => {
                return {
                  ...config,
                  isActive: config.category === title ? !config.isActive : config.isActive
                }
              })
            }
          }
        });
        return;
    }
  };

  return { useGetDLCOptions, useSetDLCOptions };
};

export default useDLCOptions;