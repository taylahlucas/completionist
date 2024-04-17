import React from 'react';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import { SettingsListItem } from '@utils/CustomInterfaces';
import SettingsContentMainHeader from './SettingsContentMainHeader.native';
import useGetUserGameData from '@data/hooks/useGetUserGameData';
import { 
	styles, 
	SettingsContentSubItemContainer, SettingsContentScrollView, SettingsContentTitle 
} from './SettingsContentStyledComponents.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import useSettingsState from './hooks/useSettingsState';
import useSettingsDispatch from './hooks/useSettingsDispatch';
import SettingsContentCheckBox from './SettingsContentCheckbox.native';
import useTranslateGameContent from '@utils/hooks/useTranslateGameContent.native';
import useMainState from '@redux/hooks/useMainState';

interface SettingsContentItemDropdownProps {
  item: SettingsListItem;
}

const SettingsContentItemDropdown = ({ item }: SettingsContentItemDropdownProps) => {
  const theme = useGetTheme();
  const { selectedGameSettings } = useMainState();
  const { setSelectedCategory } = useSettingsDispatch();
  const { selectedCategory } = useSettingsState();
  const { getUserSettingsSubConfig, getUserSettingsDLC } = useGetUserGameData();
  const { translateCategoryName, translateDLCName } = useTranslateGameContent();

  return (
    <Dropdown
      isOpen={item.id === selectedCategory.category}
      setOpen={(): void => setSelectedCategory({
        ...selectedCategory,
        category: item.id === selectedCategory.category ? '' : item.id
      })}
      header={<SettingsContentMainHeader item={item} />}
    >
      <SettingsContentScrollView contentContainerStyle={styles.scrollContent}>
        {getUserSettingsSubConfig(item.id).map((settingsItem, index) => (
          <SettingsContentSubItemContainer key={index} color={theme.darkGrey}>
            <SettingsContentTitle color={theme.lightGrey} align='left'>
              {translateCategoryName(selectedGameSettings, item.id, settingsItem.id)}
            </SettingsContentTitle>
            <SettingsContentCheckBox item={settingsItem} />
          </SettingsContentSubItemContainer>
        ))
        .concat(
          getUserSettingsDLC(item.id).map((dlcItem, index) => (
            <SettingsContentSubItemContainer key={`${dlcItem}-${index}`} color={theme.darkGrey}>
              <SettingsContentTitle color={theme.lightGrey} align='left'>
                {translateDLCName(selectedGameSettings, dlcItem.id)}
              </SettingsContentTitle>
              <SettingsContentCheckBox item={dlcItem} />
            </SettingsContentSubItemContainer>
          ))
        )}
      </SettingsContentScrollView>
    </Dropdown>
  );
};

export default SettingsContentItemDropdown;