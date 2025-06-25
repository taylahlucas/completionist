import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/navigation-header';
import AddSteamIDContent from '@components/custom/steam-achievement-content/add-steam-id-content';
import { DrawerScreenEnum } from '@utils/CustomEnums';
import useAchievements from './hooks/useAchievements';

const SteamAchievements = () => {
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

export default SteamAchievements;
