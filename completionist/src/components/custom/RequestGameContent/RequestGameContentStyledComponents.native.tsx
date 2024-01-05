import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

interface RequestGameContentProps {
  color: string;
}

export const RequestGameSubtitleContainer = styled.View`
  padding: 8px;
  margin-vertical: 16px;
`;

export const RequestGameContentInputContainer = styled.View<RequestGameContentProps>`
  width: ${Dimensions.get('window').width - 32}px;
  height: 200px;
  background-color: ${props => props.color};
`;