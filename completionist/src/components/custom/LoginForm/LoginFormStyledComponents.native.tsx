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
  border-radius: 5px;
  background-color: ${(props): string => props.color};
  margin-bottom: 16px;
  justify-content: center;
`;