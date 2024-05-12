import styled from 'styled-components/native';
import Button from '@components/general/Button/Button.native';
import { LARGE_WIDTH } from '@styles/global.native';

export const LoginContentContainer = styled.View`
  align-items: center;
`;

export const LoginFormContainer = styled.View`
  margin-top: 120px;
  justify-content: center;
`;

export const LoginFormButtonContainer = styled.View`
  margin-top: -16px;
`;

export const LoginButton = styled(Button)`
	margin-bottom: 32px;
`;

export const LoginFormFooterContainer = styled.View`
  margin-top: 32px;
`;

export const SelectFirstGameContentContainer = styled.View`
	flex-direction: row;
	margin-top: 16px;
	flex-wrap: wrap;
	justify-content: flex-start;
	width: ${LARGE_WIDTH}px;
`;