import { RefObject } from 'react';
import { ScrollView } from 'react-native';

export const handleScroll = (
  scrollViewRef: RefObject<ScrollView>,
  offset: number,
) => {
  if (scrollViewRef.current) {
    scrollViewRef.current.scrollTo({ y: offset, animated: true });
  }
};
