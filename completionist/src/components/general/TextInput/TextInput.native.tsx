import React from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData, ViewStyle } from 'react-native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { TextInputStyled, TextInputCancel } from './TextInputStyledComponents.native';
import { TextInputContainer } from './TextInputStyledComponents.native';
import Condition from '../Condition.native';
import defaultStyle from '@styles/Font/FontStyle';
import { TextInputStyleType } from '@utils/CustomTypes';
import useGetTextInputStyle from './hooks/useGetTextInputStyle.native';

export interface TextInputProps {
  placeholder?: string;
  value: string;
  height?: number;
  inputStyle?: TextInputStyleType;
  onChangeText: (value: string) => void;
  onReset: () => void;
  leftComponent?: JSX.Element;
  multiline?: boolean;
}

const TextInput = ({ 
  placeholder, 
  value, 
  height = 45, 
  inputStyle = 'default',
  onChangeText, 
  onReset,
  leftComponent,
  multiline = false
}: TextInputProps) => {
  const theme = useGetTheme();
  const inputTypeStyle = useGetTextInputStyle(inputStyle)

  return (
    <TextInputContainer height={height} style={inputTypeStyle} multiline={multiline}>
      <Condition condition={!!leftComponent}>
        {leftComponent}
      </Condition>
      <TextInputStyled
        color={theme.lightGrey}
        hasLeftComponent={!!leftComponent}
        style={{ ...defaultStyle['ListItemSubTitle'] }}
        placeholder={placeholder}
        placeholderTextColor={theme.midGrey}
        value={value}
        onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>): void => onChangeText(event.nativeEvent.text ?? '')}
        multiline={multiline}
      />
      <Condition condition={!!value.length}>
        <TextInputCancel
          onPress={onReset}
          name={'cancel'}
          color={inputStyle === 'text' ? theme.darkGrey : theme.midGrey}
        />
      </Condition>
    </TextInputContainer>
  );
};

export default TextInput;