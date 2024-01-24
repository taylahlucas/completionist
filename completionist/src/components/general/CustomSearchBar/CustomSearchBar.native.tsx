import React from 'react';
import useGetTheme from '@styles/hooks/useGetTheme';
import { styles } from './CustomSearchBarStyles.native';
import Icon from '../Icon/Icon.native';
import TextInput from '../TextInput/TextInput.native';

export interface CustomSearchBarProps {
  placeholder?: string;
  searchValue: string;
  setSearchValue: (value: string) => void;
  onReset: () => void;
}

const CustomSearchBar = ({ placeholder = 'Search items...', searchValue, setSearchValue, onReset }: CustomSearchBarProps): JSX.Element => {
  const theme = useGetTheme();
  
  return (
    <TextInput
      placeholder={placeholder}
      value={searchValue}
      height={38}
      onChangeText={setSearchValue}
      onReset={onReset}
      leftComponent={<Icon style={styles.searchBarIcon} title={'search'} color={theme.midGrey} />}
    />

  );
};

export default CustomSearchBar;