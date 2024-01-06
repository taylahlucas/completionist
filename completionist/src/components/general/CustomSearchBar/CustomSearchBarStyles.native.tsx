import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  searchBar: {
    height: 38, 
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  searchBarIcon: {
    left: 16,
    paddingRight: 16,
    position: 'absolute',
    zIndex: 1
  }
});