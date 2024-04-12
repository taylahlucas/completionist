import { setShouldUpdateUser } from '@redux/MainState';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useMainState from '@redux/hooks/useMainState';
import { SettingsOptionEnum } from '@utils/CustomEnums';
import { SettingsOptionItem } from '@utils/CustomInterfaces';

const useSettingsOptionsOnPress = () => {
  const { user } = useMainState();
  const { setUser, setShouldUpdateUser } = useMainDispatch();

  const triggerItem = (id: SettingsOptionEnum): SettingsOptionItem[] => {
    const settings = [...user.settings.configs];

    return settings.map(item => {
      if (item.id === id) {
        return {
          id: item?.id,
          isActive: !item.isActive
        }
      }
      else {
        return item;
      }
    })
  };

  const setSettingsOptionsOnPress = (id: string) => {
    switch (id) {
      case 'completed-items':
        setUser({
          ...user,
          settings: {
            ...user.settings,
            configs: triggerItem(SettingsOptionEnum.COMPLETED_ITEMS)
          }
        });
				setShouldUpdateUser(true);
        return;

      case 'disabled-sections':
        setUser({
          ...user,
          settings: {
            ...user.settings,
            configs: triggerItem(SettingsOptionEnum.DISABLED_SECTIONS)
          }
        });
				setShouldUpdateUser(true);
        return;
    }
  };

  return { setSettingsOptionsOnPress };
};

export default useSettingsOptionsOnPress;