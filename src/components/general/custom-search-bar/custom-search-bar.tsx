import React from 'react';
import { styles } from './custom-search-bar-styles';
import { Icon, TextInput } from '../';
import { useTranslation } from 'react-i18next';
import useGetTheme from '@styles/hooks/use-get-theme';

export interface CustomSearchBarProps {
  placeholder?: string;
  searchValue: string;
  setSearchValue: (value: string) => void;
  onReset: () => void;
}

export const CustomSearchBar = ({
  placeholder,
  searchValue,
  setSearchValue,
  onReset,
}: CustomSearchBarProps): React.JSX.Element => {
  const { t } = useTranslation();
  const theme = useGetTheme();

  return (
    <TextInput
      testID="search-bar"
      placeholder={placeholder ? placeholder : t('common:search')}
      value={searchValue}
      height={42}
      onChangeText={setSearchValue}
      onReset={onReset}
      leftComponent={
        <Icon
          style={styles.searchBarIcon}
          name={'search'}
          color={theme.midGrey}
        />
      }
    />
  );
};
