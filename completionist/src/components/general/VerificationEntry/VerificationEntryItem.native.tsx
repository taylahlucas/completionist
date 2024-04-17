import React from 'react';
import { View } from 'react-native';
import TextInput from '../TextInput/TextInput.native';

const VerificationEntryItem = () => {
	return (
		<View style={{ 
			width: 80, 
			height: 80,
			backgroundColor: 'grey'
	}}>
		<TextInput
			onChangeText={() => {}}
			height={70}
			maxLength={1}
			onReset={() => {}}
		/>
	</View>
	)
};

export default VerificationEntryItem;