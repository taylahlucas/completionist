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
    lineHeight: 36
  },
  ListItemTitle: {
    fontFamily: MONTSERRAT_SEMIBOLD,
    fontSize: 19,
    letterSpacing: 0.37,
    lineHeight: 22
  },
  ListItemTitleBold: {
    fontFamily: MONTSERRAT,
    fontSize: 17,
    letterSpacing: 0,
    lineHeight: 18
  },
  ListItemSubTitleBold: {
    fontFamily: MONTSERRAT_SEMIBOLD,
    fontSize: 17,
    letterSpacing: 0.37,
    lineHeight: 22
  },
  ListItemSubTitleItalic: {
    fontFamily: MONTSERRAT_ITALIC,
    fontSize: 17,
    letterSpacing: 0.37,
    lineHeight: 22
  },
  ListItemSubTitle: {
    fontFamily: MONTSERRAT,
    fontSize: 17,
    letterSpacing: 0.37,
    lineHeight: 22
  },
  ListItemSubDescription: {
    fontFamily: MONTSERRAT,
    fontSize: 14,
    letterSpacing: 0.37,
    lineHeight: 22
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