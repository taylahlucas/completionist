import { StyleSheet } from 'react-native';

// TODO: Change to these and test on Android
const MONTSERRAT = 'Montserrat-Regular';
const MONTSERRAT_ITALIC = 'Montserrat-Italic';
const MONTSERRAT_SEMIBOLD = 'Montserrat-SemiBold';

const BOLD = 'bold';
const SEMIBOLD = '500';
const REGULAR = 'normal';

export default StyleSheet.create({
  Heading: {
    fontFamily: MONTSERRAT_SEMIBOLD,
    fontSize: 22,
    letterSpacing: 0,
    lineHeight: 36,
    fontWeight: BOLD
  },
  ListItemTitle: {
    fontFamily: MONTSERRAT_SEMIBOLD,
    fontSize: 19,
    letterSpacing: 0.37,
    lineHeight: 22,
    fontWeight: SEMIBOLD,
  },
  ListItemTitleBold: {
    fontFamily: MONTSERRAT,
    fontSize: 17,
    letterSpacing: 0,
    lineHeight: 18,
    fontWeight: REGULAR
  },
  ListItemSubTitleBold: {
    fontFamily: MONTSERRAT_SEMIBOLD,
    fontSize: 17,
    letterSpacing: 0.37,
    lineHeight: 22,
    fontWeight: BOLD
  },
  ListItemSubTitleItalic: {
    fontFamily: MONTSERRAT_ITALIC,
    fontSize: 17,
    letterSpacing: 0.37,
    lineHeight: 22,
    fontWeight: REGULAR,
    fontStyle: 'italic'
  },
  ListItemSubTitle: {
    fontFamily: MONTSERRAT,
    fontSize: 17,
    letterSpacing: 0.37,
    lineHeight: 22,
    fontWeight: REGULAR
  },
  ListItemSubDescription: {
    fontFamily: MONTSERRAT,
    fontSize: 14,
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