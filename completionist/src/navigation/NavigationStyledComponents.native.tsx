import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export default StyleSheet.create({
  drawerContainer: {
    width: 200
  },
  contentContainer: {
    minHeight: '100%'
  }
});

export const NavigationDrawerContainer = styled.View`
  margin-top: 60px;
  flex-direction: column;
`;

export const NavigationDrawerBodyContainer = styled.View`
  align-content: center;
  margin-top: 16px;
`;