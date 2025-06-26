import { useState, useEffect } from 'react';
import {
  useGetShowHideOptions,
  useDLCOptions,
} from '@components/custom/settings/hooks';
import { handleScroll } from '@utils/hooks';
import { SettingsOptionEnum } from '@utils/custom-enums';
import { useMainState } from '@redux/hooks';
import { getSteamUserById } from '@data/api/endpoints';
import { SettingsOptionItem, SteamProfile } from '@utils/index';
import { useEditUserData } from '@data/hooks';
import {
  NavigationHeaderLeftActionTypes,
  NavigationHeaderRightActionTypes,
} from '@utils/custom-types';
import { useMainDispatch } from '@redux/hooks';

interface ActionsType {
  left: NavigationHeaderLeftActionTypes;
  right: NavigationHeaderRightActionTypes;
}

export const useSettings = () => {
  const [profileVisible, setProfileVisible] = useState<boolean>(false);
  const [profile, setProfile] = useState<SteamProfile | undefined>(undefined);
  const [isLanguagesOpen, setLanguagesOpen] = useState<boolean>(false);
  const { user, selectedGame, selectedGameSettings } = useMainState();
  const { setUser, setShouldUpdateUser } = useMainDispatch();
  const { getDLCOptions, setDLCOptions } = useDLCOptions();
  const options = useGetShowHideOptions();
  const { deleteUserData } = useEditUserData();
  const isGlobalSettings = !selectedGame;
  const [navigationActions, setNavigationActions] = useState<ActionsType>({
    left: 'back',
    right: 'logout',
  });

  useEffect(() => {
    setNavigationActions({
      left: isGlobalSettings ? 'back' : 'menu',
      right: isGlobalSettings ? 'logout' : 'none',
    });
  }, [isGlobalSettings]);

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
      isGlobalSettings,
      profileVisible,
      profile,
      isLanguagesOpen,
      options,
      user,
      selectedGameSettings,
      navigationActions,
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
