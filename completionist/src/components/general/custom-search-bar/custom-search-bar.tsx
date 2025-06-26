import React from 'react';
import { styles } from './custom-search-bar-styles';
import Icon from '../icon/icon';
import TextInput from '../text-input/text-input';
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
}: CustomSearchBarProps): JSX.Element => {
  const { t } = useTranslation();
  const theme = useGetTheme();

  return (
    <TextInput
      placeholder={!!placeholder ? placeholder : t('common:search')}
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
