import styled from 'styled-components/native';

interface StandardLayoutContainerProps {
  color: string;
}

export const StandardLayoutContainer = styled.SafeAreaView<StandardLayoutContainerProps>`
  width: 100%;
  height: 100%;
  flex: 1;
  background-color: ${props => props.color};
`;