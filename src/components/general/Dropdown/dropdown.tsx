import React from 'react';
import { LayoutAnimation } from 'react-native';
import { DropdownPressable, DropdownContainer } from './';
import { Condition } from '../condition';

interface DropdownProps {
  testID?: string;
  header: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  enabled?: boolean;
}

export const Dropdown = ({
  testID,
  header,
  children,
  isOpen,
  setOpen,
  enabled = true,
}: DropdownProps) => {
  const toggleOpen = () => {
    setOpen(!isOpen);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  return (
    <DropdownContainer testID={testID}>
      <DropdownPressable
        testID={`dropdown-pressable-${testID}`}
        enabled={enabled}
        disabled={!enabled}
        onPress={toggleOpen}>
        {header}
      </DropdownPressable>
      <Condition condition={isOpen}>{children}</Condition>
    </DropdownContainer>
  );
};
