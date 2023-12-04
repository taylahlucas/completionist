import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { styles } from './CustomSearchBarStyles.native';

export interface CustomSearchBarProps {
  placeholder?: string;
}

const CustomSearchBar = ({ placeholder = 'Search items...' }: CustomSearchBarProps): JSX.Element => {
  const theme = useGetTheme();
  const [searchValue, setSearchValue] = useState('');

  return (
    <View style={{...styles.searchBarContainer, backgroundColor: theme.darkGrey}}>
      {/* <Icon style={styles.searchBarIcon} name={'search'} color={theme.midGrey} size={25} /> */}
      <TextInput
        style={{...styles.textInput, color: theme.lightGrey }}
        placeholder={placeholder}
        placeholderTextColor={theme.midGrey}
        onPressIn={(): void => setSearchValue('')}
        onChange={(event): void => setSearchValue(event.nativeEvent.text ?? '')}
      />
    </View>
  );
};

export default CustomSearchBar;