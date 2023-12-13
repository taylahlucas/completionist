import { DEFAULT_BORDER_RADIUS } from '@styles/global';
import styled from 'styled-components/native';

export const LoginFormContainer = styled.View`
  margin-top: 50%;
  width: 300px;
  justify-content: center;
`;

interface LoginFormContainerProps {
  color: string;
};

export const LoginTextInputContainer = styled.View<LoginFormContainerProps>`
  height: 45px;
  border-radius: ${DEFAULT_BORDER_RADIUS}px;
  background-color: ${(props): string => props.color};
  margin-bottom: 16px;
  justify-content: center;
`;