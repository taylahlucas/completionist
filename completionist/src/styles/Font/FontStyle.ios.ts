import { StyleSheet } from 'react-native';

const AVENIR_LIGHT = 'Avenir-Light';
const MONTSERRAT = 'Montserrat-Regular';
const BOLD = '700';
const SEMIBOLD = '500';
const REGULAR = '400';

export default StyleSheet.create({
  Heading: {
    fontFamily: MONTSERRAT,
    fontSize: 22,
    letterSpacing: 0.37,
    lineHeight: 41,
    fontWeight: BOLD
  },
    ListItemTitle: {
    fontFamily: AVENIR_LIGHT,
    fontSize: 19,
    letterSpacing: 0.37,
    lineHeight: 22,
    fontWeight: SEMIBOLD,
  },
  ListItemTitleBold: {
    fontFamily: AVENIR_LIGHT,
    fontSize: 17,
    letterSpacing: 0.37,
    lineHeight: 22,
    fontWeight: BOLD
  },
  ListItemSubTitleBold: {
    fontFamily: AVENIR_LIGHT,
    fontSize: 17,
    letterSpacing: 0.37,
    lineHeight: 22,
    fontWeight: BOLD
  },
  ListItemSubTitleItalic: {
    fontFamily: AVENIR_LIGHT,
    fontSize: 17,
    letterSpacing: 0.37,
    lineHeight: 22,
    fontWeight: REGULAR,
    fontStyle: 'italic'
  },
  ListItemSubTitle: {
    fontFamily: AVENIR_LIGHT,
    fontSize: 17,
    letterSpacing: 0.37,
    lineHeight: 22,
    fontWeight: REGULAR,
  },
  ListItemSubDescription: {
    fontFamily: AVENIR_LIGHT,
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