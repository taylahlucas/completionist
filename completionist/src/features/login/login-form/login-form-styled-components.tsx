import styled from 'styled-components/native';
import { Button } from '@components/general';
import { LARGE_WIDTH, LARGE_PADDING } from '@styles/global';

export const LoginContentContainer = styled.View`
  align-items: center;
`;

export const LoginFormContainer = styled.View`
  margin-top: 120px;
  justify-content: center;
`;

export const LoginFormContentContainer = styled.View`
  margin-top: -16px;
`;

export const LoginButton = styled(Button)`
  margin-bottom: ${LARGE_PADDING}px;
`;

export const LoginFormFooterContainer = styled.View`
  margin-top: ${LARGE_PADDING}px;
`;

export const SelectFirstGameContentContainer = styled.View`
  flex-direction: row;
  margin-top: 16px;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: ${LARGE_WIDTH}px;
`;
