import React from 'react';
import { Pressable, View } from 'react-native';
import Condition from '../Condition.native';

interface DropdownProps {
  header: any;
  children: any;
  isOpen: boolean;
  setOpen: (value: boolean) => void;
}

const Dropdown = ({ header, children, isOpen, setOpen }: DropdownProps) => {
  return (
    <View style={{ minWidth: 300 }}>
      <Pressable onPress={(): void => setOpen(!isOpen)}>{header}</Pressable>
      <Condition condition={isOpen}>
        {children}
      </Condition>
    </View>
  );
};

export default Dropdown;