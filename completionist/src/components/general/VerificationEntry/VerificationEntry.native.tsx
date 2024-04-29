import React, { useRef, useState, useEffect, RefObject } from 'react';
import { View, TextInput as RNTextInput } from 'react-native';
import TextInput from '../TextInput/TextInput.native';

interface VerificationEntryProps {
	token: string;
	setIsValid: (validated: boolean) => void;
};

interface RefMapping {
  [key: number]: RefObject<RNTextInput> | undefined;
}

const VerificationEntry = ({ token, setIsValid }: VerificationEntryProps) => {
	const inputRefs = useRef<RefMapping>(Array.from({ length: token.length }, () => React.createRef<RNTextInput>()));
	const [value, setValue] = useState<string>('');
	const [currentIndex, setCurrentIndex] = useState(0);

	// useHandlePaste

	useEffect(() => {
		setIsValid(value === token);
	}, [value]);

	return (
		<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
			{[...token].map((_, index) => (
					<TextInput
						key={index}
						ref={inputRefs.current[index]} 
						onFocus={(): void => setCurrentIndex(index)}
						inputStyle='verification'
						onChangeText={(text) => {
							setValue(value.concat(text));
							if (currentIndex + 1 <= token.length - 1) {
								setCurrentIndex(currentIndex + 1);
								inputRefs.current[currentIndex + 1]?.current?.focus()
							}
						}}
						onKeyPress={({ nativeEvent }) => {
							if (nativeEvent.key === 'Backspace') {
								if (currentIndex !== 0) {
									setValue(value.slice(0, -1));
									setCurrentIndex(currentIndex - 1);
									inputRefs.current[currentIndex - 1]?.current?.focus()
								}
							}
						}}
						maxLength={1}
						value={value[index]}
						onReset={() => {}}
						autoFocus={index === currentIndex}
						onTouchStart={(): void => {
							setCurrentIndex(index);
						}}
					/>
				))}
		</View>
	);
};

export default VerificationEntry;