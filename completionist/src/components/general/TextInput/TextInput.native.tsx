import React from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData, ViewStyle } from 'react-native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { TextInputStyled, TextInputCancel } from './TextInputStyledComponents.native';
import { TextInputContainer } from './TextInputStyledComponents.native';
import Condition from '../Condition.native';
import defaultStyle from '@styles/Font/FontStyle';

export interface TextInputProps {
  placeholder?: string;
  value: string;
  style?: ViewStyle;
  onChangeText: (value: string) => void;
  onReset: () => void;
  leftComponent?: JSX.Element;
  multiline?: boolean;
}

const TextInput = ({ 
  placeholder, 
  value, 
  style, 
  onChangeText, 
  onReset,
  leftComponent,
  multiline = false
}: TextInputProps) => {
  const theme = useGetTheme();

  return (
    <TextInputContainer color={theme.darkGrey} style={style} multiline={multiline}>
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
      <TextInputCancel
        onPress={onReset}
        name={'cancel'}
        color={theme.midGrey}
      />
    </TextInputContainer>
  );
};

export default TextInput;