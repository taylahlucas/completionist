import React from 'react';
import {
  SheetContentHeaderButton,
  SheetContentHeaderContainer,
  SheetContentHeaderTitle,
  SheetContentLayoutContainer,
} from './layout-styled-components';
import useGetTheme from '@styles/hooks/use-get-theme';
import { IconTypeEnum } from '@utils/custom-enums';
import { useNavigation } from '@react-navigation/native';

interface SheetContentLayoutProps {
  title?: string;
  children: React.ReactNode | React.ReactNode[];
}

export const SheetContentLayout = ({
  title,
  children,
}: SheetContentLayoutProps) => {
  const theme = useGetTheme();
  const navigation = useNavigation();

  return (
    <SheetContentLayoutContainer>
      <SheetContentHeaderContainer>
        <SheetContentHeaderTitle type="Heading" color={theme.lightGrey}>
          {title}
        </SheetContentHeaderTitle>
        <SheetContentHeaderButton
          name="arrow-down"
          type={IconTypeEnum.Ionicons}
          color={theme.lightGrey}
          onPress={(): void => navigation.goBack()}
        />
      </SheetContentHeaderContainer>
      {children}
    </SheetContentLayoutContainer>
  );
};
