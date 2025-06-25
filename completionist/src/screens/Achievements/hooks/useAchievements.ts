import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useMainState from '@redux/hooks/useMainState';
import { getSteamPlayerAchievements } from '@data/api/endpoints';
import {
  SteamAchievementItem,
  SteamAchievementsState,
} from '@utils/CustomInterfaces';
import { useEditUserData, useGetGameProgressData } from '@data/hooks/index';
import { getCurrentGame } from '@data/hooks/index';
import { GameKeyEnum } from '@utils/CustomEnums';

const useAchievements = () => {
  const { t } = useTranslation();
  const { user, selectedGame } = useMainState();
  const [progressViewOpen, setProgressViewOpen] = useState<boolean>(true);
  const [steamAchievementsOpen, setSteamAchievementsOpen] =
    useState<boolean>(false);
  const [achievementsState, setAchievementsState] =
    useState<SteamAchievementsState>({
      hasPermission: !!user.steamId,
      items: [],
      noOfLocked: 0,
    });
  const currentGame = getCurrentGame(
    selectedGame?.id ?? user.gameData[0].id,
    user,
  );
  const { getGameProgress } = useGetGameProgressData();
  const gameProgress = getGameProgress([selectedGame?.id] as GameKeyEnum[]);
  const { updateUserData } = useEditUserData();

  useEffect(() => {
    const fetchData = async () => {
      const currentGameId = currentGame?.appId;
      if (!currentGameId) {
        // TODO: Log Could not find any game id
        console.log('Could not find any game id');
        return;
      }

      if (user.steamId && currentGameId) {
        const response = await getSteamPlayerAchievements({
          steamId: user.steamId,
          gameId: currentGameId.toString(),
        });

        if (response && !response?.hasPermission) {
          setAchievementsState({
            ...achievementsState,
            hasPermission: false,
          });
        } else if (response && response?.achievements) {
          const items: SteamAchievementItem[] =
            response?.noOfLocked > 0
              ? [
                  {
                    id: 'locked',
                    name: response?.noOfLocked + ' Locked Achievements',
                    description: 'Unlock these by playing more of the game',
                    unlocked: false,
                    icon: '',
                  },
                ]
              : response?.achievements;

          setAchievementsState({
            ...achievementsState,
            hasPermission: true,
            items,
            noOfLocked: response?.achievements.length + response?.noOfLocked,
          });
        }
      }
    };

    fetchData();
  }, [selectedGame, user.steamId]);

  return {
    viewModel: {
      user,
      gameId: selectedGame?.id as GameKeyEnum,
      achievementsState,
      steamAchievementsOpen,
      progressViewOpen,
      gameProgress,
      steamAchievements: {
        title: !user.steamId
          ? t('common:screens.addSteamId')
          : t('common:screens.steamAchievements'),
      },
    },
    actions: {
      setAchievementsState,
      setSteamAchievementsOpen,
      setProgressViewOpen,
      updateUserData,
    },
  };
};

export default useAchievements;
