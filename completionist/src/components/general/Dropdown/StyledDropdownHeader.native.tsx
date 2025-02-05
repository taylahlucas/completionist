import React from 'react';
import StyledText from '@components/general/Text/StyledText.native';
import { DropdownTitleContainer } from './DropdownStyledComponents.native';
import Icon from '@components/general/Icon/Icon.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { IconTypeEnum } from '@utils/CustomEnums';
import { Condition, Seperator } from '@components/general/index';
import {
  SMALL_PADDING,
  MID_PADDING,
  MID_WIDTH,
  LARGE_PADDING,
} from '@styles/global.native';

interface StyledDropdownHeaderProps {
  title: string;
  valueTitle?: string;
  isOpen: boolean;
}

const StyledDropdownHeader = ({
  title,
  valueTitle,
  isOpen,
}: StyledDropdownHeaderProps) => {
  const theme = useGetTheme();
  return (
    <>
      <DropdownTitleContainer>
        <StyledText
          align="left"
          numberOfLines={1}
          type="ListItemTitleBold"
          style={{
            paddingTop: SMALL_PADDING,
            paddingLeft: MID_PADDING,
            maxWidth: MID_WIDTH,
          }}>
          {title}
        </StyledText>
        {!!valueTitle && (
          <StyledText
            style={{
              top: 6,
              position: 'absolute',
              right: LARGE_PADDING,
            }}>
            {valueTitle}
          </StyledText>
        )}
        <Icon
          name={isOpen ? 'arrow-drop-down' : 'arrow-right'}
          type={IconTypeEnum.MaterialIcons}
          style={{ top: 4 }}
          color={theme.midGrey}
        />
      </DropdownTitleContainer>
      <Seperator />
    </>
  );
};

export default StyledDropdownHeader;
