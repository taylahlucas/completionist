import React from 'react';
import { Image } from 'react-native';
import { SteamAchievement } from '@utils/custom-interfaces';
import StyledText from '@components/general/text/styled-text';
import {
  SteamAchievementItemContainer,
  SteamAchievementIconContainer,
  SteamAchievementContentContainer,
} from './';
import useGetTheme from '@styles/hooks/use-get-theme';

interface SteamAchievementItemProps {
  achievement: SteamAchievement;
}

const SteamAchievementItem = ({ achievement }: SteamAchievementItemProps) => {
  const theme = useGetTheme();

  return (
    <SteamAchievementItemContainer
      color={achievement.achieved ? theme.lightGreen : theme.darkGrey}>
      <SteamAchievementIconContainer>
        <Image
          style={{ width: 45, height: 45 }}
          source={{ uri: achievement.icon }}
        />
        <SteamAchievementContentContainer>
          <StyledText
            align="left"
            type={'ListItemSubTitleBold'}
            color={achievement.achieved ? theme.lightGrey : theme.midGrey}
            ellipsizeMode="tail"
            numberOfLines={1}>
            {achievement.displayName}
          </StyledText>
          <StyledText
            align="left"
            color={achievement.achieved ? theme.lightGrey : theme.midGrey}
            ellipsizeMode="tail"
            numberOfLines={1}>
            {achievement.description}
          </StyledText>
        </SteamAchievementContentContainer>
      </SteamAchievementIconContainer>
    </SteamAchievementItemContainer>
  );
};

export default SteamAchievementItem;
