import React from 'react';
import { StandardLayout } from '@components/general';
import { NavigationHeader } from '@navigation/index';
import { DrawerScreenEnum } from '@utils/index';
import { useAchievements } from './hooks';
import { SteamAchievementsContent } from '@features/achievements';

export const SteamAchievements = () => {
  const { viewModel } = useAchievements();

  return (
    <StandardLayout>
      <NavigationHeader
        id={DrawerScreenEnum.SteamAchievements}
        title={viewModel.steamAchievements.title}
        leftAction="back"
      />
      <SteamAchievementsContent />
    </StandardLayout>
  );
};
