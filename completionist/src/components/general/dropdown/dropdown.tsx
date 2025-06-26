import React from 'react';
import { LayoutAnimation } from 'react-native';
import { Condition } from '@components/general/index';
import {
  DropdownPressable,
  DropdownContainer,
} from './dropdown-styled-components';

interface DropdownProps {
  testID?: string;
  header: any;
  children: any;
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
        enabled={enabled}
        disabled={!enabled}
        onPress={toggleOpen}>
        {header}
      </DropdownPressable>
      <Condition condition={isOpen}>{children}</Condition>
    </DropdownContainer>
  );
};
