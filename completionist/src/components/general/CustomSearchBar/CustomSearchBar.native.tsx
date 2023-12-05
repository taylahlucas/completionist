import React from 'react';
import { View, TextInput } from 'react-native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { styles } from './CustomSearchBarStyles.native';
import useMainDispatch from 'src/redux/hooks/useMainDispatch.native';
import Icon from '../Icon/Icon.native';

export interface CustomSearchBarProps {
  placeholder?: string;
}

const CustomSearchBar = ({ placeholder = 'Search items...' }: CustomSearchBarProps): JSX.Element => {
  const theme = useGetTheme();
  const { setSearchValue } = useMainDispatch();
  
  // TODO: Add cancel button and search icon
  return (
    <View style={{...styles.searchBarContainer, backgroundColor: theme.darkGrey}}>
      <Icon style={styles.searchBarIcon} name={'search'} color={theme.midGrey} />
      <TextInput
        style={{...styles.textInput, color: theme.lightGrey }}
        placeholder={placeholder}
        placeholderTextColor={theme.midGrey}
        onPressIn={(): void => setSearchValue('')}
        onChange={(event): void => setSearchValue(event.nativeEvent.text ?? '')}
      />
      {/* <Icon name={'cancel'} color={theme.midGrey} /> */}
    </View>
  );
};

export default CustomSearchBar;