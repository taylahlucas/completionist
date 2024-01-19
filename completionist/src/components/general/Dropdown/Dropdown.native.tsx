import React from 'react';
import { Dimensions, View, LayoutAnimation } from 'react-native';
import Condition from '../Condition.native';
import { DropdownPressable } from './DropdownStyledComponents.native';

interface DropdownProps {
  header: any;
  children: any;
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  enabled?: boolean;
}

const Dropdown = ({ header, children, isOpen, setOpen, enabled = true }: DropdownProps) => {
  const toggleOpen = () => {
    setOpen(!isOpen);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  return (
    <View style={{ minWidth: Dimensions.get('window').width - 32, marginTop: 4, marginBottom: 4 }}>
      <DropdownPressable 
        enabled={enabled}
        disabled={!enabled}
        onPress={toggleOpen}
      >
        {header}
      </DropdownPressable>
      <Condition condition={isOpen}>
        {children}
      </Condition>
    </View>
  );
};

export default Dropdown;