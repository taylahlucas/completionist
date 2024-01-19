import React from 'react';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import StyledText from '@components/general/Text/StyledText.native';
import { SettingsConfigItem } from '@utils/CustomInterfaces';
import SettingsContentMainHeader from './SettingsContentMainHeader.native';
import useGetUserGameData from '@data/hooks/useGetUserGameData.native';
import { style, SettingsContentSubItemContainer, SettingsContentScrollView } from './SettingsContentStyledComponents.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import useSettingsState from './hooks/useSettingsState';
import useSettingsDispatch from './hooks/useSettingsDispatch';
import SettingsContentCheckBox from './SettingsContentCheckbox.native';

interface SettingsContentItemDropdownProps {
  item: SettingsConfigItem;
}

const SettingsContentItemDropdown = ({ item }: SettingsContentItemDropdownProps) => {
  const theme = useGetTheme();
  const { setSelectedCategory } = useSettingsDispatch();
  const { selectedCategory } = useSettingsState();
  const { getUserSettingsSubConfig } = useGetUserGameData();
  
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
        {getUserSettingsSubConfig(item.section).map((item, index) => (
          <SettingsContentSubItemContainer key={index} color={theme.darkGrey}>
            <StyledText color={theme.lightGrey} align={'left'}>
              {item.category === 'None' ? 'Main' : item.category}
            </StyledText>
            <SettingsContentCheckBox item={item} />
          </SettingsContentSubItemContainer>
        ))}
      </SettingsContentScrollView>
    </Dropdown>
  );
};

export default SettingsContentItemDropdown;