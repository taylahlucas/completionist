import { StyleSheet } from 'react-native';

const AVENIR_LIGHT = 'Avenir-Light';
const BOLD = '700';
const REGULAR = '400';

export default StyleSheet.create({
  Heading: {
    fontFamily: AVENIR_LIGHT,
    fontSize: 22,
    letterSpacing: 0.37,
    lineHeight: 41,
    fontWeight: BOLD
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
  ListItemSubTitle: {
    fontFamily: AVENIR_LIGHT,
    fontSize: 17,
    letterSpacing: 0.37,
    lineHeight: 22,
    fontWeight: REGULAR
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