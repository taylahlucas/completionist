import React from 'react';
import useGetTheme from '@styles/hooks/use-get-theme';
import { Condition } from '@components/general';
import {
  SteamAchievementIcon,
  SteamAchievementViewContainer,
  SteamAchievementIconContainerCol,
  SteamItemTitle,
  SteamItemDescription,
} from './';
import { SteamAchievementItem } from '@utils/index';

interface SteamAchievementViewProps {
  item: SteamAchievementItem;
}

export const SteamAchievementView = ({ item }: SteamAchievementViewProps) => {
  const theme = useGetTheme();

  return (
    <SteamAchievementViewContainer
      style={{
        backgroundColor: theme.darkGrey,
        borderColor: item.unlocked ? theme.lightPurple : theme.midGrey,
      }}>
      <Condition condition={!!item.icon}>
        <SteamAchievementIcon source={{ uri: item.icon }} />
      </Condition>
      <SteamAchievementIconContainerCol>
        <SteamItemTitle
          hasBottomPadding={!!item.description}
          align="left"
          type="ListItemTitleBold"
          color={item.unlocked ? theme.lightGrey : theme.midGrey}>
          {item.name}
        </SteamItemTitle>

        {item.description ? (
          <SteamItemDescription align="left" numberOfLines={2}>
            {item.description}
          </SteamItemDescription>
        ) : null}
      </SteamAchievementIconContainerCol>
    </SteamAchievementViewContainer>
  );
};
