import { StyleSheet } from 'react-native';

const MONTSERRAT = 'Montserrat-Regular';
const MONTSERRAT_ITALIC = 'Montserrat-Italic';
const MONTSERRAT_SEMIBOLD = 'Montserrat-SemiBold';

export default StyleSheet.create({
  Heading: {
    fontFamily: MONTSERRAT_SEMIBOLD,
    fontSize: 22,
    letterSpacing: 0.37,
    lineHeight: 41
  },
    ListItemTitle: {
    fontFamily: MONTSERRAT_SEMIBOLD,
    fontSize: 19,
    letterSpacing: 0.37,
    lineHeight: 22
  },
  ListItemTitleBold: {
    fontFamily: MONTSERRAT_SEMIBOLD,
    fontSize: 16,
    letterSpacing: 0.37,
    lineHeight: 22
  },
  ListItemSubTitleBold: {
    fontFamily: MONTSERRAT_SEMIBOLD,
    fontSize: 16,
    letterSpacing: 0.37,
    lineHeight: 22
  },
  ListItemSubTitleItalic: {
    fontFamily: MONTSERRAT_ITALIC,
    fontSize: 16,
    letterSpacing: 0.37,
    lineHeight: 22
  },
  ListItemSubTitle: {
    fontFamily: MONTSERRAT,
    fontSize: 16,
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