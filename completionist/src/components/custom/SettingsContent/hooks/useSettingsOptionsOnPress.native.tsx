import useMainDispatch from '@redux/hooks/useMainDispatch';
import useMainState from '@redux/hooks/useMainState';
import { SettingsOptionEnum } from '@utils/CustomEnums';
import { SettingsOptionItem } from '@utils/CustomInterfaces';

const useSettingsOptionsOnPress = () => {
  const { user } = useMainState();
  const { setUser } = useMainDispatch();

  const triggerItem = (id: SettingsOptionEnum): SettingsOptionItem[] => {
    const settings = [...user.settings];

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

  const settingsOptionsOnPress = (id: string) => {
    console.log("ID: ", id)
    switch (id) {
      case 'completed-items':
        setUser({
          ...user,
          settings: triggerItem(SettingsOptionEnum.COMPLETED_ITEMS)
        });

        return;

      case 'disabled-sections':
        setUser({
          ...user,
          settings: triggerItem(SettingsOptionEnum.DISABLED_SECTIONS)
        });
        return;
    }
  };

  return { settingsOptionsOnPress };
};

export default useSettingsOptionsOnPress;