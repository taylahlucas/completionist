import React from 'react';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import { SettingsListItem } from '@utils/CustomInterfaces';
import SettingsMainHeader from './SettingsMainHeader.native';
import useGetUserGameData from '@data/hooks/useGetUserGameData';
import { 
	styles, 
	SettingsSubItemContainer, SettingsScrollView, SettingsTitle 
} from './SettingsStyledComponents.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import useSettingsState from './hooks/useSettingsState';
import useSettingsDispatch from './hooks/useSettingsDispatch';
import SettingsCheckbox from './SettingsCheckbox.native';
import useTranslateGameContent from '@utils/hooks/useTranslateGameContent.native';
import useMainState from '@redux/hooks/useMainState';

interface SettingsItemDropdownProps {
  item: SettingsListItem;
}

const SettingsItemDropdown = ({ item }: SettingsItemDropdownProps) => {
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
      header={<SettingsMainHeader item={item} />}
    >
      <SettingsScrollView contentContainerStyle={styles.scrollContent}>
        {getUserSettingsSubConfig(item.id).map((settingsItem, index) => (
          <SettingsSubItemContainer key={index} color={theme.darkGrey}>
            <SettingsTitle color={theme.lightGrey} align='left'>
              {translateCategoryName(selectedGameSettings, item.id, settingsItem.id)}
            </SettingsTitle>
            <SettingsCheckbox item={settingsItem} />
          </SettingsSubItemContainer>
        ))
        .concat(
          getUserSettingsDLC(item.id).map((dlcItem, index) => (
            <SettingsSubItemContainer key={`${dlcItem}-${index}`} color={theme.darkGrey}>
              <SettingsTitle color={theme.lightGrey} align='left'>
                {translateDLCName(selectedGameSettings, dlcItem.id)}
              </SettingsTitle>
              <SettingsCheckbox item={dlcItem} />
            </SettingsSubItemContainer>
          ))
        )}
      </SettingsScrollView>
    </Dropdown>
  );
};

export default SettingsItemDropdown;