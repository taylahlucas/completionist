import useMainState from '@redux/hooks/useMainState';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';
import { skyrimDLC, fallout4DLC } from '@utils/constants';
import { SettingsConfigItem, SettingsListItem, UserData } from '@utils/CustomInterfaces';
import useMainDispatch from '@redux/hooks/useMainDispatch';

interface DLCOptionsReturnType {
  useGetDLCOptions: () => SettingsListItem[];
  useSetDLCOptions: (title: string) => void;
}

const useDLCOptions = (): DLCOptionsReturnType => {
  const { setUser } = useMainDispatch();
  const { selectedGameSettings, user } = useMainState();

  const updateSettingsConfig = (gameKey: string, id: string) => {
    setUser({
      ...user,
      data: {
        ...user.data,
        [gameKey]: {
          ...(user.data as any)[gameKey],
          settingsConfig: (user.data as any)[gameKey].settingsConfig.map((config: SettingsConfigItem) => ({
            ...config,
            isActive: config.category === id ? !config.isActive : config.isActive,
          })),
        },
      },
    });
  };

  const useGetDLCOptions = (): SettingsListItem[] => {
    switch (selectedGameSettings) {
      case SubscriptionTypeEnum.SKYRIM:
        return skyrimDLC.map((item) => {
          return {
            id: item,
            title: item,
            isActive: user.data.skyrim.settingsConfig.filter(config => config.category === item && config.isActive).length > 0
          }
        });
      case SubscriptionTypeEnum.FALLOUT_4:
        return fallout4DLC.map((item) => {
          return {
            id: item,
            title: item,
            isActive: user.data.fallout4.settingsConfig.filter(config => config.category === item && config.isActive).length > 0
          }
        });
    }
  };

  const useSetDLCOptions = (id: string) => {
    switch (selectedGameSettings) {
      case SubscriptionTypeEnum.SKYRIM:
        updateSettingsConfig('skyrim', id);
        // setUser({
        //   ...user,
        //   data: {
        //     ...user.data,
        //     skyrim: {
        //       ...user.data.skyrim,
        //       settingsConfig: user.data.skyrim.settingsConfig.map(config => {
        //         return {
        //           ...config,
        //           isActive: config.category === id ? !config.isActive : config.isActive
        //         }
        //       })
        //     }
        //   }
        // });
        return;

      case SubscriptionTypeEnum.FALLOUT_4:
        updateSettingsConfig('fallout4', id);
        // setUser({
        //   ...user,
        //   data: {
        //     ...user.data,
        //     fallout4: {
        //       ...user.data.fallout4,
        //       settingsConfig: user.data.fallout4.settingsConfig.map(config => {
        //         return {
        //           ...config,
        //           isActive: config.category === id ? !config.isActive : config.isActive
        //         }
        //       })
        //     }
        //   }
        // });
        return;
    }
  };

  return { useGetDLCOptions, useSetDLCOptions };
};

export default useDLCOptions;