import React from 'react';
import { View, TextInput, Pressable } from 'react-native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { styles } from './CustomSearchBarStyles.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import Icon from '../Icon/Icon.native';
import useMainState from '@redux/hooks/useMainState';

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
      <TextInput
        style={{ ...styles.textInput, color: theme.lightGrey }}
        placeholder={placeholder}
        placeholderTextColor={theme.midGrey}
        value={searchValue}
        onPressIn={(): void => setSearchValue('')}
        onChange={(event): void => setSearchValue(event.nativeEvent.text ?? '')}
      />
      <Pressable 
        style={{ position: 'absolute', right: 16 }}
        onPress={(): void => reset()}
      >
        <Icon name={'cancel'} color={theme.midGrey} />
      </Pressable>
    </View>
  );
};

export default CustomSearchBar;