import { useState } from 'react';
import {
  useGetShowHideOptions,
  useDLCOptions,
} from '@components/custom/settings/hooks';
import { handleScroll } from '@utils/hooks';
import { getSteamUserById } from '@data/index';
import {
  SettingsOptionItem,
  SteamProfile,
  SettingsOptionEnum,
} from '@utils/index';
import { useEditUserData } from '@data/hooks';
import { useMainDispatch, useMainState } from '@redux/hooks';

export const useSettings = () => {
  const [profileVisible, setProfileVisible] = useState<boolean>(false);
  const [profile, setProfile] = useState<SteamProfile | undefined>(undefined);
  const [isLanguagesOpen, setLanguagesOpen] = useState<boolean>(false);
  const { user, selectedGameSettings } = useMainState();
  const { setUser, setShouldUpdateUser } = useMainDispatch();
  const { getDLCOptions, setDLCOptions } = useDLCOptions();
  const options = useGetShowHideOptions();
  const { deleteUserData } = useEditUserData();

  const triggerItem = (id: SettingsOptionEnum): SettingsOptionItem[] => {
    const settings = [...user.settings.configs];

    return settings.map(item => {
      if (item.id === id) {
        return {
          id: item?.id,
          isActive: !item.isActive,
        };
      } else {
        return item;
      }
    });
  };

  const setSettingsOptionsOnPress = (id: string) => {
    switch (id) {
      // TODO: Translate id to type
      case 'completed-items':
        setUser({
          ...user,
          settings: {
            ...user.settings,
            configs: triggerItem(SettingsOptionEnum.COMPLETED_ITEMS),
          },
        });
        setShouldUpdateUser(true);
        return;

      case 'disabled-sections':
        setUser({
          ...user,
          settings: {
            ...user.settings,
            configs: triggerItem(SettingsOptionEnum.DISABLED_SECTIONS),
          },
        });
        setShouldUpdateUser(true);
        return;
    }
  };

  return {
    viewModel: {
      profileVisible,
      profile,
      isLanguagesOpen,
      options,
      user,
      selectedGameSettings,
    },
    actions: {
      getSteamUserById,
      deleteUserData,
      setProfileVisible,
      setProfile,
      setLanguagesOpen,
      getDLCOptions,
      setDLCOptions,
      handleScroll,
      setSettingsOptionsOnPress,
    },
  };
};
