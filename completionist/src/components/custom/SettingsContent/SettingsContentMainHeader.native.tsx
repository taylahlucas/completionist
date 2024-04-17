import React from 'react';
import { useTranslation } from 'react-i18next';
import useGetTheme from '@styles/hooks/useGetTheme';
import { SettingsListItem } from '@utils/CustomInterfaces';
import SettingsContentCheckBox from './SettingsContentCheckbox.native';
import { SettingsContentMainItem, SettingsContentMainItemTitle } from './SettingsContentStyledComponents.native';

interface SettingsContentMainHeaderProps {
  item: SettingsListItem;
}

const SettingsContentMainHeader = ({ item }: SettingsContentMainHeaderProps) => {
  const { t } = useTranslation();
  const theme = useGetTheme();

  return (
    <SettingsContentMainItem color={theme.darkGrey}>
      <SettingsContentMainItemTitle 
        align='left' 
        type='ListItemSubTitleBold'
        color={theme.lightGrey}
      >
        {t(`common:screens.${item.id.toLowerCase()}`)}
      </SettingsContentMainItemTitle>
      <SettingsContentCheckBox item={item} />
    </SettingsContentMainItem>
  );
};

export default SettingsContentMainHeader;