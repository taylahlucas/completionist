import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  searchBarContainer: {
    height: 38, 
    width: Dimensions.get('window').width - 32,
    marginTop: 16,
    borderRadius: 5,
    justifyContent: 'center'
  },
  searchBarIcon: {
    position: 'absolute',
    marginLeft: 16
  },
  textInput: {
    marginLeft: 48,
    marginRight: 48,
    fontSize: 17
  },
});