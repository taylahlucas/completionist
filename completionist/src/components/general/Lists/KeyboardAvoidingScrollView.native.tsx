import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import {KeyboardAwareContainer} from '@components/general/index';
import ScrollableList from '@components/general/Lists/ScrollableList.native';

interface KeyboardAvoidingScrollViewProps {
	children: JSX.Element[];
	awareView: any;
}

const KeyboardAvoidingScrollView = ({ children, awareView }: KeyboardAvoidingScrollViewProps) => {
	return (
		<KeyboardAvoidingView 
			behavior='padding'
			style={{ flex: 1 }}
		>
			<ScrollableList>
				{children}
			</ScrollableList>
			<KeyboardAwareContainer>
				{awareView}
			</KeyboardAwareContainer>
		</KeyboardAvoidingView>
	);
};

export default KeyboardAvoidingScrollView;