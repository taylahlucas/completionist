import React, { useRef, useState, RefObject } from 'react';
import { View, TextInput as RNTextInput } from 'react-native';
import TextInput from '../TextInput/TextInput.native';

interface VerificationEntryProps {
	length: number;
	value: string;
	setValue: (value: string) => void;
};

interface RefMapping {
  [key: number]: RefObject<RNTextInput> | undefined;
}

const VerificationEntry = ({ length, value, setValue }: VerificationEntryProps) => {
	const inputRefs = useRef<RefMapping>(Array.from({ length: length }, () => React.createRef<RNTextInput>()));
	const [currentIndex, setCurrentIndex] = useState(0);

	// TODO: useHandlePaste
	return (
		<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
			{Array.from({ length: length }).map((_, index) => (
					<TextInput
						key={index}
						ref={inputRefs.current[index]} 
						onFocus={(): void => setCurrentIndex(index)}
						inputStyle='verification'
						onChangeText={(text) => {
							setValue(value.concat(text));
							if (currentIndex + 1 <= length - 1) {
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
						onTouchStart={(): void => setCurrentIndex(index)}
					/>
				))}
		</View>
	);
};

export default VerificationEntry;