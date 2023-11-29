import { StyleSheet } from 'react-native';

const listStyles = StyleSheet.create({
  scrollableContent: {
    alignItems: 'center', 
    alignSelf: 'center'
  },
  scrollableList: {
    padding: 16
  },
  selectableButton: {
    justifyContent: 'center',
    height: 50,
    borderRadius: 10,
    marginBottom: 8
  }
});

export default listStyles;