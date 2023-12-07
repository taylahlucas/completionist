import React from 'react';
import { View } from 'react-native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { styles } from './CustomSearchBarStyles.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import Icon from '../Icon/Icon.native';
import useMainState from '@redux/hooks/useMainState';
import CustomTextInput from '../TextInput/CustomTextInput.native';

export interface CustomSearchBarProps {
  placeholder?: string;
}

const CustomSearchBar = ({ placeholder = 'Search items...' }: CustomSearchBarProps): JSX.Element => {
  const theme = useGetTheme();
  const { setSearchValue, reset } = useMainDispatch();
  const { searchValue } = useMainState();

  return (
    <View style={{ ...styles.searchBarContainer, backgroundColor: theme.darkGrey }}>
      <Icon style={styles.searchBarIcon} name={'search'} color={theme.midGrey} />
      <CustomTextInput 
        placeholder={placeholder}
        value={searchValue}
        onChange={setSearchValue}
        onReset={(): void => reset()}
      />
    </View>
  );
};

export default CustomSearchBar;