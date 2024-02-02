import React, { useState } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData, TextInputProps as RNTextInputProps } from 'react-native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { TextInputStyled, TextInputCancel } from './TextInputStyledComponents.native';
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
  const inputTypeStyle = useGetTextInputStyle(inputStyle)
  const [isSecure, setIsSecure] = useState(props.secureTextEntry ?? false);
  
  return (
    <TextInputContainer height={height} style={inputTypeStyle} multiline={props.multiline ?? false}>
      <Condition condition={!!leftComponent}>
        {leftComponent}
      </Condition>
      <TextInputStyled
        color={theme.lightGrey}
        hasLeftComponent={!!leftComponent}
        style={defaultStyle['ListItemSubTitle']}
        placeholder={props.placeholder}
        placeholderTextColor={theme.midGrey}
        value={props.value}
        onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>): void => onChangeText(event.nativeEvent.text ?? '')}
        multiline={props.multiline ?? false}
        secureTextEntry={isSecure}
      />
      <Condition condition={props.secureTextEntry ?? false}>
        <TextInputCancel
          onPress={(): void => setIsSecure(!isSecure)}
          name={isSecure ? 'eye-off-outline' : 'eye-outline'}
          type={IconTypeEnum.Ionicons}
          color={theme.midGrey}
        />
      </Condition>
      <Condition condition={!!props.value && props.value?.length > 0 && !props.secureTextEntry}>
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