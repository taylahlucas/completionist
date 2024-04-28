import React, { ForwardRefExoticComponent, useState } from 'react';
import {
	NativeSyntheticEvent,
	TextInputChangeEventData,
	TextInput as RNTextInput,
	TextInputProps as RNTextInputProps
} from 'react-native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { TextInputIcon } from './TextInputStyledComponents.native';
import { TextInputContainer } from './TextInputStyledComponents.native';
import Condition from '../Condition.native';
import defaultStyle from '@styles/Font/FontStyle';
import { TextInputStyleType } from '@utils/CustomTypes';
import useGetTextContainerStyle from './hooks/useGetTextContainerStyle.native';
import { IconTypeEnum } from '@utils/CustomEnums';
import useGetTextInputStyle from './hooks/useGetTextInputStyle.native';

export interface TextInputProps extends RNTextInputProps {
	onChangeText: (value: string) => void;
	onReset: () => void;
	height?: number;
	inputStyle?: TextInputStyleType;
	leftComponent?: JSX.Element;
}

const TextInput = React.forwardRef<RNTextInput, TextInputProps>((props, ref) => {
	const theme = useGetTheme();
	const { testID, onChangeText, onReset, height = 45, inputStyle = 'default', leftComponent, value, multiline, secureTextEntry } = props;
	const containerStyle = useGetTextContainerStyle(inputStyle)
	const textInputStyle = useGetTextInputStyle(inputStyle, !!leftComponent);
	const [isSecure, setIsSecure] = useState<boolean>(secureTextEntry ?? false);

	return (
		<TextInputContainer height={height} style={containerStyle} multiline={multiline ?? false}>
			<Condition condition={!!leftComponent}>
				{leftComponent}
			</Condition>
			<RNTextInput
				testID={testID}
				ref={ref}
				style={{ ...textInputStyle, ...defaultStyle['ListItemSubTitle'], color: theme.lightGrey }}
				placeholderTextColor={theme.midGrey}
				selectionColor={theme.midGrey}
				onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>): void => onChangeText(event.nativeEvent.text ?? '')}
				{...props}
				secureTextEntry={isSecure}
			/>
			<Condition condition={secureTextEntry ?? false}>
				<TextInputIcon
					testID={'show-password'}
					style={{ marginRight: !!value && value?.length > 0 ? 32 : 0 }}
					onPress={(): void => setIsSecure(!isSecure)}
					name={isSecure ? 'eye-off-outline' : 'eye-outline'}
					type={IconTypeEnum.Ionicons}
					color={theme.midGrey}
				/>
			</Condition>
			<Condition condition={!!value && value?.length > 0 && inputStyle !== 'verification'}>
				<TextInputIcon
					testID={'reset-input'}
					onPress={onReset}
					name={'cancel'}
					color={inputStyle === 'text' ? theme.darkGrey : theme.midGrey}
				/>
			</Condition>
		</TextInputContainer>
	);
});

export default TextInput;