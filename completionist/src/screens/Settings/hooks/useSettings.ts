import { useState, useEffect } from 'react';
import useDLCOptions from '@components/custom/Settings/hooks/useDLCOptions';
import useGetShowHideOptions from '@components/custom/Settings/hooks/useGetShowHideOptions';
import useHandleScroll from '@utils/hooks/useHandleScroll.native';
import { SettingsOptionEnum } from '@utils/CustomEnums';
import useMainState from '@redux/hooks/useMainState';
import useEndpoints from '@data/api/hooks/useEndpoints.native';
import { SettingsOptionItem, SteamProfile } from '@utils/CustomInterfaces';
import { useEditUserData } from '@data/hooks/useEditUserData.native';
import {
  NavigationHeaderLeftActionTypes,
  NavigationHeaderRightActionTypes,
} from '@utils/CustomTypes';
import useMainDispatch from '@redux/hooks/useMainDispatch';

interface ActionsType {
  left: NavigationHeaderLeftActionTypes;
  right: NavigationHeaderRightActionTypes;
}

const useSettings = () => {
  const [profileVisible, setProfileVisible] = useState<boolean>(false);
  const [profile, setProfile] = useState<SteamProfile | undefined>(undefined);
  const [isLanguagesOpen, setLanguagesOpen] = useState<boolean>(false);
  const { user, selectedGame, selectedGameSettings } = useMainState();
  const { setUser, setShouldUpdateUser } = useMainDispatch();
  const { getDLCOptions, setDLCOptions } = useDLCOptions();
  const options = useGetShowHideOptions();
  const handleScroll = useHandleScroll();
  const { getSteamUserById } = useEndpoints();
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

export default useSettings;
