import styled from 'styled-components/native';
import { DEFAULT_BORDER_RADIUS, STANDARD_WIDTH } from '@styles/global.native';

interface RequestGameContentProps {
  color: string;
}

export const RequestGameContainer = styled.View`
  padding: 8px;
  margin: 16px;
`;

export const RequestGameContentInputContainer = styled.View<RequestGameContentProps>`
  width: ${STANDARD_WIDTH}px;
  height: 200px;
  border-radius: ${DEFAULT_BORDER_RADIUS}px;
  background-color: ${(props): string => props.color};
  justify-content: center;
`;