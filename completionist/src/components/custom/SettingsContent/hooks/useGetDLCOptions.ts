import useMainState from '@redux/hooks/useMainState';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';
import { skyrimDLC, fallout4DLC } from '@utils/constants';
import { SettingsListItem } from '@utils/CustomInterfaces';

const useGetDLCOptions = (): SettingsListItem[] => {
  const { selectedGameSettings } = useMainState();

  switch (selectedGameSettings) {
    case SubscriptionTypeEnum.SKYRIM:
      return skyrimDLC.map((item, index) => {
        return {
          id: `${index}-${item}`,
          title: item,
          isChecked: false
        }
      });
    case SubscriptionTypeEnum.FALLOUT_4:
      return fallout4DLC.map((item, index) => {
        return {
          id: `${index}-${item}`,
          title: item,
          isChecked: false
        }
      });
  }
};

export default useGetDLCOptions;