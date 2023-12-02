import { StyleSheet } from 'react-native';

const ROBOTO = 'Roboto';
const BOLD = 'bold';
const REGULAR = 'normal';

export default StyleSheet.create({
  Heading: {
    fontFamily: ROBOTO,
    fontSize: 22,
    letterSpacing: 0,
    lineHeight: 36,
    fontWeight: BOLD
  },
  ListItemTitleBold: {
    fontFamily: ROBOTO,
    fontSize: 17,
    letterSpacing: 0,
    lineHeight: 18,
    fontWeight: REGULAR
  },
  ListItemSubTitleBold: {
    fontFamily: ROBOTO,
    fontSize: 17,
    letterSpacing: 0.37,
    lineHeight: 22,
    fontWeight: BOLD
  },
  ListItemSubTitle: {
    fontFamily: ROBOTO,
    fontSize: 17,
    letterSpacing: 0.37,
    lineHeight: 22,
    fontWeight: REGULAR
  },
  left: {
    textAlign: 'left'
  },
  center: {
    textAlign: 'center'
  },
  right: {
    textAlign: 'right'
  }
});