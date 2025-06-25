import React from 'react';
import { NavigationDrawerItemData } from '@utils/custom-interfaces';
import { useReactNavigation } from './hooks';
import {
  NavigationHeaderSubTitle,
  NavigationHeaderTitleContainer,
  NavigationDrawerTitle,
} from '.';
import useGetTheme from '@styles/hooks/use-get-theme';
import { useContentDispatch } from '@components/custom/content-list/provider';
import { ContentSectionEnum } from '@utils/custom-enums';
import { Condition } from '@components/general';

interface NavigationDrawerItemProps {
  item: NavigationDrawerItemData;
  isActive: boolean;
}

export const NavigationDrawerItem = ({
  item,
  isActive,
}: NavigationDrawerItemProps) => {
  const theme = useGetTheme();
  const navigation = useReactNavigation();
  const { setSelectedSection, setSelectedCategory } = useContentDispatch();

  return (
    <Condition condition={!item.isHidden}>
      <NavigationHeaderTitleContainer
        key={item.id}
        disabled={!item.isEnabled}
        onPress={(): void => {
          navigation.navigate(item.id);
          const contentEnum = item.id.toLocaleLowerCase();
          if (contentEnum as ContentSectionEnum) {
            setSelectedSection(contentEnum as ContentSectionEnum);
          }
          setSelectedCategory({
            category: '',
          });
        }}>
        <NavigationDrawerTitle
          type="ListItemTitle"
          color={isActive ? theme.lightGrey : theme.midGrey}
          align="left"
          numberOfLines={1}>
          {item.title}
        </NavigationDrawerTitle>
        <NavigationHeaderSubTitle
          color={isActive ? theme.lightGrey : theme.midGrey}
          align="left"
          numberOfLines={1}>
          {item.subTitle}
        </NavigationHeaderSubTitle>
      </NavigationHeaderTitleContainer>
    </Condition>
  );
};
