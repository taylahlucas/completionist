import React from 'react';
import { View } from 'react-native';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import DropdownSelection from '@components/general/Dropdown/DropdownSelection.native';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';
import DropdownSelectionContent from '@components/general/Dropdown/DropdownSelectionContent.native';
import useSettingsState from './hooks/useSettingsState';
import useSettingsDispatch from './hooks/useSettingsDispatch';
import StyledText from '@components/general/Text/StyledText.native';
import SettingsContentCollectionList from './SettingsContentCollectionList.native';
import { games } from '@utils/constants';

const SettingsContent = () => {
  const { triggerSelectionOpen, setSelectedGameSettings } = useSettingsDispatch();
  const { isSelectionOpen, selectedGameSettings } = useSettingsState();

  return (
    <View style={{ marginTop: 32 }}>
      <StyledText style={{ marginLeft: 8, padding: 8 }} type={'ListItemSubTitle'} align={'left'}>Set collections:</StyledText>
      <Dropdown
        isOpen={isSelectionOpen}
        setOpen={() => null}
        header={
          <DropdownSelection item={selectedGameSettings} isSelected={isSelectionOpen} onPress={(): void => triggerSelectionOpen(!isSelectionOpen)}/>
        }
      >
        <DropdownSelectionContent content={games} onPress={(value) => {
            triggerSelectionOpen(false);
            setSelectedGameSettings(value as SubscriptionTypeEnum);
          }} 
        />
      </Dropdown>
      <SettingsContentCollectionList />
    </View>
  );
};

export default SettingsContent;