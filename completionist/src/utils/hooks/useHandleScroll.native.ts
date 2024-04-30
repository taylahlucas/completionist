import { RefObject } from 'react';
import { ScrollView } from 'react-native';

const useHandleScroll = () => {
	const handleScroll = (scrollViewRef: RefObject<ScrollView>, offset: number) => {
		if (scrollViewRef.current) {
			scrollViewRef.current.scrollTo({ y: offset, animated: true })
		}
	};

	return handleScroll;
};

export default useHandleScroll;