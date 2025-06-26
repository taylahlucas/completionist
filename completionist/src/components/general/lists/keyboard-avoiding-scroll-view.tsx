import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { ScrollableList, KeyboardAwareContainer } from '@components/general';

interface KeyboardAvoidingScrollViewProps {
  children: JSX.Element[];
  awareView: any;
}

export const KeyboardAvoidingScrollView = ({
  children,
  awareView,
}: KeyboardAvoidingScrollViewProps) => (
  <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
    <ScrollableList>{children}</ScrollableList>
    <KeyboardAwareContainer>{awareView}</KeyboardAwareContainer>
  </KeyboardAvoidingView>
);
