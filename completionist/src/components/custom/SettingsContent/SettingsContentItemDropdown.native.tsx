import React from 'react';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import { SettingsConfigItem } from '@utils/CustomInterfaces';
import SettingsContentMainHeader from './SettingsContentMainHeader.native';
import useGetUserGameData from '@data/hooks/useGetUserGameData';
import { style, SettingsContentSubItemContainer, SettingsContentScrollView, SettingsContentTitle} from './SettingsContentStyledComponents.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import useSettingsState from './hooks/useSettingsState';
import useSettingsDispatch from './hooks/useSettingsDispatch';
import SettingsContentCheckBox from './SettingsContentCheckbox.native';
import useTranslateGameContent from '@utils/hooks/useTranslateGameContent.native';
import useMainState from '@redux/hooks/useMainState';

interface SettingsContentItemDropdownProps {
  item: SettingsConfigItem;
}

const SettingsContentItemDropdown = ({ item }: SettingsContentItemDropdownProps) => {
  const theme = useGetTheme();
  const { selectedGameSettings } = useMainState();
  const { setSelectedCategory } = useSettingsDispatch();
  const { selectedCategory } = useSettingsState();
  const { getUserSettingsSubConfig } = useGetUserGameData();
  const { translateCategoryName } = useTranslateGameContent();
  
  return (
    <Dropdown
      isOpen={item.section === selectedCategory.category}
      setOpen={(): void => setSelectedCategory({
        ...selectedCategory,
        category: item.section === selectedCategory.category ? '' : item.section
      })}
      header={<SettingsContentMainHeader item={item} />}
    >
      <SettingsContentScrollView contentContainerStyle={style.scrollContent}>
        {getUserSettingsSubConfig(item.section).map((settingsItem, index) => (
          <SettingsContentSubItemContainer key={index} color={theme.darkGrey}>
            <SettingsContentTitle color={theme.lightGrey} align={'left'}>
              {translateCategoryName(selectedGameSettings, settingsItem)}
            </SettingsContentTitle>
            <SettingsContentCheckBox item={settingsItem} />
          </SettingsContentSubItemContainer>
        ))}
      </SettingsContentScrollView>
    </Dropdown>
  );
};

export default SettingsContentItemDropdown;