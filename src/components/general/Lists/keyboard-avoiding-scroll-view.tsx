import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollableList, KeyboardAwareContainer } from '@components/general';

interface KeyboardAvoidingScrollViewProps {
  children: React.JSX.Element[];
  awareView: any;
}

export const KeyboardAvoidingScrollView = ({
  children,
  awareView,
}: KeyboardAvoidingScrollViewProps) => (
  <KeyboardAvoidingView
    behavior="padding"
    style={{ flex: 1 }}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
    <ScrollableList>{children}</ScrollableList>
    <KeyboardAwareContainer>{awareView}</KeyboardAwareContainer>
  </KeyboardAvoidingView>
);
