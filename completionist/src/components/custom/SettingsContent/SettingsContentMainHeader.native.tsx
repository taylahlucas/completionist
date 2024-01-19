import React from 'react';
import useGetTheme from '@styles/hooks/useGetTheme';
import { SettingsConfigItem } from '@utils/CustomInterfaces';
// import SettingsContentCheckBox from './SettingsContentCheckBox.native';
import { SettingsContentMainItem, SettingsContentMainItemTitle } from './SettingsContentStyledComponents.native';

interface SettingsContentMainHeaderProps {
  item: SettingsConfigItem;
}

const SettingsContentMainHeader = ({ item }: SettingsContentMainHeaderProps) => {
  const theme = useGetTheme();

  return (
    <SettingsContentMainItem color={theme.darkGrey}>
      <SettingsContentMainItemTitle align={'left'} type={'ListItemSubTitleBold'} color={theme.lightGrey}>{item.section}</SettingsContentMainItemTitle>
      {/* <SettingsContentCheckBox item={item} /> */}
    </SettingsContentMainItem>
  );
};

export default SettingsContentMainHeader;