import React from 'react';
import useGetTheme from '@styles/hooks/use-get-theme';
import Icon from '@components/general/icon/icon';
import { IconTypeEnum } from '@utils/custom-enums';
import { DropdownTitleContainer } from '@components/general/dropdown';
import StyledText from '@components/general/text/styled-text';

interface SteamAchievementDropdownTitleProps {
  title: string;
  isOpen: boolean;
}

export const SteamAchievementDropdownTitle = ({
  title,
  isOpen,
}: SteamAchievementDropdownTitleProps) => {
  const theme = useGetTheme();

  return (
    <DropdownTitleContainer>
      <StyledText
        align="left"
        type="SubHeading"
        color={theme.lightGrey}
        style={{
          paddingBottom: 8,
          paddingLeft: 8,
        }}>
        {title}
      </StyledText>
      <Icon
        name={isOpen ? 'arrow-drop-down' : 'arrow-right'}
        type={IconTypeEnum.MaterialIcons}
        color={theme.lightGrey}
        style={{ bottom: 2 }}
      />
    </DropdownTitleContainer>
  );
};
