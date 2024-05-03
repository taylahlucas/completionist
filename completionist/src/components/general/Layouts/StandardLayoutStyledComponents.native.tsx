import styled from 'styled-components/native';

interface StandardLayoutContainerProps {
  color: string;
}

export const StandardLayoutContainer = styled.View<StandardLayoutContainerProps>`
  width: 100%;
  height: 100%;
	padding-top: 32px;
  flex: 1;
  background-color: ${props => props.color};
`;