import React from 'react';
import StandardLayout from '@components/general/layouts/standard-layout';
import { NavigationHeader } from '@navigation/index';
import { AddSteamIDContent } from '@components/custom';
import { DrawerScreenEnum } from '@utils/custom-enums';
import { useAchievements } from './hooks';

export const SteamAchievements = () => {
  const { viewModel } = useAchievements();

  return (
    <StandardLayout>
      <NavigationHeader
        id={DrawerScreenEnum.SteamAchievements}
        title={viewModel.steamAchievements.title}
        leftAction="back"
      />
      <AddSteamIDContent />
    </StandardLayout>
  );
};
