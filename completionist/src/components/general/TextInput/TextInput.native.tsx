import React, { useState } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData, TextInputProps as RNTextInputProps } from 'react-native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { TextInputStyled, TextInputIcon } from './TextInputStyledComponents.native';
import { TextInputContainer } from './TextInputStyledComponents.native';
import Condition from '../Condition.native';
import defaultStyle from '@styles/Font/FontStyle';
import { TextInputStyleType } from '@utils/CustomTypes';
import useGetTextInputStyle from './hooks/useGetTextInputStyle.native';
import { IconTypeEnum } from '@utils/CustomEnums';

export interface TextInputProps extends RNTextInputProps {
  onChangeText: (value: string) => void;
  height?: number;
  inputStyle?: TextInputStyleType;
  onReset: () => void;
  leftComponent?: JSX.Element;
}

const TextInput = ({ 
  onChangeText,
  height = 45, 
  inputStyle = 'default',
  onReset,
  leftComponent,
  ...props
}: TextInputProps) => {
  const theme = useGetTheme();
	const { testID, value, placeholder, multiline, secureTextEntry, inputMode, maxLength } = props;
  const inputTypeStyle = useGetTextInputStyle(inputStyle)
  const [isSecure, setIsSecure] = useState(secureTextEntry ?? false);

	// TODO: Test adding {...props}
  return (
    <TextInputContainer height={height} style={inputTypeStyle} multiline={multiline ?? false}>
      <Condition condition={!!leftComponent}>
        {leftComponent}
      </Condition>
      <TextInputStyled
				testID={testID}
        color={theme.lightGrey}
        hasLeftComponent={!!leftComponent}
        style={defaultStyle['ListItemSubTitle']}
        // placeholder={placeholder}
        placeholderTextColor={theme.midGrey}
        // value={value}
        onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>): void => onChangeText(event.nativeEvent.text ?? '')}
        // multiline={multiline ?? false}
        secureTextEntry={isSecure}
				// inputMode={inputMode}
				// maxLength={maxLength}
				{...props}
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
      <Condition condition={!!value && value?.length > 0}>
        <TextInputIcon
					testID={'reset-input'}
          onPress={onReset}
          name={'cancel'}
          color={inputStyle === 'text' ? theme.darkGrey : theme.midGrey}
        />
      </Condition>
    </TextInputContainer>
  );
};

export default TextInput;