import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  searchBarContainer: {
    height: 38, 
    width: Dimensions.get('window').width - 32,
    marginTop: 16,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
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