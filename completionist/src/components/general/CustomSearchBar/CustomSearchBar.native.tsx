import React from 'react';
import { View } from 'react-native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { styles } from './CustomSearchBarStyles.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import Icon from '../Icon/Icon.native';
import useMainState from '@redux/hooks/useMainState';
import TextInput from '../TextInput/TextInput.native';

export interface CustomSearchBarProps {
  placeholder?: string;
}

const CustomSearchBar = ({ placeholder = 'Search items...' }: CustomSearchBarProps): JSX.Element => {
  const theme = useGetTheme();
  const { setSearchValue, reset } = useMainDispatch();
  const { searchValue } = useMainState();

  return (
    <TextInput
      placeholder={placeholder}
      value={searchValue}
      style={styles.searchBar}
      onChangeText={setSearchValue}
      onReset={(): void => reset()}
      leftComponent={<Icon style={styles.searchBarIcon} name={'search'} color={theme.midGrey} />}
    />

  );
};

export default CustomSearchBar;