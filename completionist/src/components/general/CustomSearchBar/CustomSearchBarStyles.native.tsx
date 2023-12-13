import { DEFAULT_BORDER_RADIUS } from '@styles/global';
import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  searchBarContainer: {
    height: 38, 
    width: Dimensions.get('window').width - 32,
    marginTop: 16,
    borderRadius: DEFAULT_BORDER_RADIUS,
    justifyContent: 'center',
    // flexDirection: 'row',
  },
  searchBarIcon: {
    left: 16,
    paddingRight: 16
  },
  textInput: {
    marginLeft: 16,
    marginRight: 48,
    fontSize: 17
  },
});