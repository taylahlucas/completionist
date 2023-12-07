import React from 'react';
import { Pressable, TextInput } from 'react-native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { styles } from '../CustomSearchBar/CustomSearchBarStyles.native';
import Icon from '../Icon/Icon.native';

export interface TextInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onReset: () => void;
}

const CustomTextInput = ({ placeholder, value, onChange, onReset }: TextInputProps) => {
  const theme = useGetTheme();
  
  return (
    <>
      <TextInput
        style={{ ...styles.textInput, color: theme.lightGrey }}
        placeholder={placeholder}
        placeholderTextColor={theme.midGrey}
        value={value}
        onChange={(event): void => onChange(event.nativeEvent.text ?? '')}
      />
        <Pressable 
          style={{ position: 'absolute', right: 16 }}
          onPress={onReset}
        >
        <Icon name={'cancel'} color={theme.midGrey} />
      </Pressable>
    </>
  );
};

export default CustomTextInput;