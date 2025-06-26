import React from 'react';
import { DropdownTitleContainer } from './dropdown-styled-components';
import useGetTheme from '@styles/hooks/use-get-theme';
import { IconTypeEnum } from '@utils/index';
import { Icon, Seperator, StyledText } from '../';
import {
  SMALL_PADDING,
  MID_PADDING,
  MID_WIDTH,
  LARGE_PADDING,
} from '@styles/global';

interface StyledDropdownHeaderProps {
  title: string;
  valueTitle?: string;
  isOpen: boolean;
}

export const StyledDropdownHeader = ({
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
