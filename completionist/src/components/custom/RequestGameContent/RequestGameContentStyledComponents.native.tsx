import TextInput from '@components/general/TextInput/TextInput.native';
import { DEFAULT_BORDER_RADIUS } from '@styles/global';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

interface RequestGameContentProps {
  color: string;
}

export const RequestGameContainer = styled.View`
  padding: 8px;
  margin: 16px;
`;

export const RequestGameContentInputContainer = styled.View<RequestGameContentProps>`
  width: ${Dimensions.get('window').width - 64}px;
  height: 200px;
  border-radius: ${DEFAULT_BORDER_RADIUS}px;
  background-color: ${(props): string => props.color};
  justify-content: center;
`;

export const RequestGameContentTextInput = styled(TextInput)<RequestGameContentProps>`
  height: 200px;
`;