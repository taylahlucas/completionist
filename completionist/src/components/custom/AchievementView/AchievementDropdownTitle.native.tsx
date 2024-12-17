import React from 'react';
import useGetTheme from '@styles/hooks/useGetTheme';
import Icon from '@components/general/Icon/Icon.native';
import { IconTypeEnum } from '@utils/CustomEnums';
import { DropdownTitleContainer } from '@components/general/Dropdown/index';
import StyledText from '@components/general/Text/StyledText.native';

interface AchievementDropdownTitleProps {
  title: string;
  isOpen: boolean;
}

const AchievementDropdownTitle = ({
  title,
  isOpen,
}: AchievementDropdownTitleProps) => {
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

export default AchievementDropdownTitle;
