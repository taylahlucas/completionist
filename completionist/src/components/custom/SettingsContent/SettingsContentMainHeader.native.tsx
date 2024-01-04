import React from 'react';
import useGetTheme from '@styles/hooks/useGetTheme';
import { SettingsConfigItem } from '@utils/CustomInterfaces';
import SettingsContentCheckbox from './SettingsContentCheckbox.native';
import { SettingsContentMainItem, SettingsContentMainItemTitle } from './SettingsContentStyledComponents.native';

interface SettingsContentMainHeaderProps {
  item: SettingsConfigItem;
}

const SettingsContentMainHeader = ({ item }: SettingsContentMainHeaderProps) => {
  const theme = useGetTheme();

  return (
    <SettingsContentMainItem color={theme.darkGrey}>
      <SettingsContentMainItemTitle align={'left'} type={'ListItemSubTitle'}>{item.section}</SettingsContentMainItemTitle>
      <SettingsContentCheckbox item={item} />
    </SettingsContentMainItem>
  );
};

export default SettingsContentMainHeader;