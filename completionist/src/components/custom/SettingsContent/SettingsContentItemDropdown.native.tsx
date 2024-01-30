import React from 'react';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import StyledText from '@components/general/Text/StyledText.native';
import { SettingsConfigItem } from '@utils/CustomInterfaces';
import SettingsContentMainHeader from './SettingsContentMainHeader.native';
import useGetUserGameData from '@data/hooks/useGetUserGameData';
import { style, SettingsContentSubItemContainer, SettingsContentScrollView } from './SettingsContentStyledComponents.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import useSettingsState from './hooks/useSettingsState';
import useSettingsDispatch from './hooks/useSettingsDispatch';
import SettingsContentCheckBox from './SettingsContentCheckbox.native';
import useMainState from '@redux/hooks/useMainState';
import { useTranslation } from 'react-i18next';

interface SettingsContentItemDropdownProps {
  item: SettingsConfigItem;
}

const SettingsContentItemDropdown = ({ item }: SettingsContentItemDropdownProps) => {
  const { t } = useTranslation();
  const theme = useGetTheme();
  const { selectedGameSettings } = useMainState();
  const { setSelectedCategory } = useSettingsDispatch();
  const { selectedCategory } = useSettingsState();
  const { getUserSettingsSubConfig } = useGetUserGameData();

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const convertToCamelCase = (value: string) => {
    let splitValue = value.split(/\s+|-/);

    if (splitValue.length > 1) {
      splitValue = splitValue.map((item, index) => index === 0 ? item.toLocaleLowerCase() : capitalize(item));
      return splitValue.join().replace(",", '');
    }
    return splitValue[0].toLocaleLowerCase();
  };

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
              {/* // TODO: Heree convert none and main to translations */}
            {item.category === 'None' ? 'Main' : t(`categories:${selectedGameSettings.toLocaleLowerCase()}.categories.${item.section.toLocaleLowerCase()}.${convertToCamelCase(item.category)}`)}
            </StyledText>
            <SettingsContentCheckBox item={item} />
          </SettingsContentSubItemContainer>
        ))}
      </SettingsContentScrollView>
    </Dropdown>
  );
};

export default SettingsContentItemDropdown;