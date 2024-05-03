import React from 'react';
import { useTranslation } from 'react-i18next';
import useGetTheme from '@styles/hooks/useGetTheme';
import { SettingsListItem } from '@utils/CustomInterfaces';
import SettingsCheckbox from './SettingsCheckbox.native';
import { SettingsMainItem, SettingsMainItemTitle } from './SettingsStyledComponents.native';

interface SettingsMainHeaderProps {
  item: SettingsListItem;
}

const SettingsMainHeader = ({ item }: SettingsMainHeaderProps) => {
  const { t } = useTranslation();
  const theme = useGetTheme();

  return (
    <SettingsMainItem color={theme.darkGrey}>
      <SettingsMainItemTitle 
        align='left' 
        type='ListItemSubTitleBold'
        color={theme.lightGrey}
      >
        {t(`common:screens.${item.id.toLowerCase()}`)}
      </SettingsMainItemTitle>
      <SettingsCheckbox item={item} />
    </SettingsMainItem>
  );
};

export default SettingsMainHeader;