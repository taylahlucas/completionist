import React from 'react';
import useGetTheme from '@styles/hooks/useGetTheme';
import Icon from '@components/general/Icon/Icon.native';
import { IconTypeEnum } from '@utils/CustomEnums';
import { DropdownTitleContainer } from '@components/general/Dropdown';
import StyledText from '@components/general/Text/StyledText.native';
import { Seperator } from '@components/general';

interface SteamAchievementDropdownSubtitleProps {
  title: string;
  isOpen: boolean;
}

export const SteamAchievementDropdownSubtitle = ({
  title,
  isOpen,
}: SteamAchievementDropdownSubtitleProps) => {
  const theme = useGetTheme();

  return (
    <>
      <DropdownTitleContainer>
        <StyledText
          align="left"
          type="ListItemTitleBold"
          style={{ paddingTop: 8, paddingLeft: 16 }}>
          {title}
        </StyledText>
        <Icon
          name={isOpen ? 'arrow-drop-down' : 'arrow-right'}
          type={IconTypeEnum.MaterialIcons}
          style={{ top: 6 }}
          color={theme.midGrey}
        />
      </DropdownTitleContainer>
      <Seperator />
    </>
  );
};
