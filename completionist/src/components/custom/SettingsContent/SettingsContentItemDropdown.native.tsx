import React, { useState } from 'react';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import StyledText from '@components/general/Text/StyledText.native';
import { SettingsConfigItem } from '@utils/CustomInterfaces';
import SettingsContentMainHeader from './SettingsContentMainHeader.native';
import useGetUserGameData from '@data/hooks/useGetUserGameData.native';
import { style, SettingsContentSubItemContainer, SettingsContentScrollView } from './SettingsContentStyledComponents.native';
import SettingsContentCheckbox from './SettingsContentCheckbox.native';
import useGetTheme from '@styles/hooks/useGetTheme';

interface SettingsContentItemDropdownProps {
  item: SettingsConfigItem;
}

const SettingsContentItemDropdown = ({ item }: SettingsContentItemDropdownProps) => {
  const theme = useGetTheme();
  const [isOpen, setOpen] = useState<boolean>(false);
  const { getUserSettingsSubConfig } = useGetUserGameData();

  return (
    <Dropdown
      isOpen={isOpen}
      setOpen={() => setOpen(!isOpen)}
      header={<SettingsContentMainHeader item={item} />}
    >
      <SettingsContentScrollView contentContainerStyle={style.scrollContent}>
        {getUserSettingsSubConfig(item.section).map((item, index) => (
          <SettingsContentSubItemContainer key={index} color={theme.darkGrey}>
            <StyledText color={theme.lightGrey} align={'left'}>
              {item.category === 'None' ? 'Main' : item.category}
            </StyledText>
            <SettingsContentCheckbox item={item} />
          </SettingsContentSubItemContainer>
        ))}
      </SettingsContentScrollView>
    </Dropdown>
  );
};

export default SettingsContentItemDropdown;