import React from 'react';
import useGetTheme from '@styles/hooks/useGetTheme';
import { styles } from './CustomSearchBarStyles.native';
import Icon from '../Icon/Icon.native';
import TextInput from '../TextInput/TextInput.native';
import { useTranslation } from 'react-i18next';

export interface CustomSearchBarProps {
  placeholder?: string;
  searchValue: string;
  setSearchValue: (value: string) => void;
  onReset: () => void;
}

const CustomSearchBar = ({ placeholder, searchValue, setSearchValue, onReset }: CustomSearchBarProps): JSX.Element => {
  const { t } = useTranslation();
  const theme = useGetTheme();
  
  return (
    <TextInput
      placeholder={!!placeholder ? placeholder : t('common:search')}
      value={searchValue}
      height={38}
      onChangeText={setSearchValue}
      onReset={onReset}
      leftComponent={<Icon style={styles.searchBarIcon} name={'search'} color={theme.midGrey} />}
    />

  );
};

export default CustomSearchBar;