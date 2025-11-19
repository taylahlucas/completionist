import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMainState } from '@redux/hooks';
import { getCurrentGame, getSteamPlayerAchievements } from '@data/index';
import {
  GameKeyEnum,
  SteamAchievementItem,
  SteamAchievementsState,
} from '@utils/index';
import { useEditUserData, useGetGameProgressData } from '@data/hooks/index';

export const useAchievements = () => {
  const { t } = useTranslation();
  const { user, selectedGameData } = useMainState();
  const [progressViewOpen, setProgressViewOpen] = useState<boolean>(true);
  const [steamAchievementsOpen, setSteamAchievementsOpen] =
    useState<boolean>(true);
  const [achievementsState, setAchievementsState] =
    useState<SteamAchievementsState>({
      hasPermission: !!user.steamId,
      items: [],
      noOfLocked: 0,
    });
  const currentGame = getCurrentGame(
    selectedGameData?.id ?? user.gameData[0].id,
    user,
  );
  const { getGameProgress } = useGetGameProgressData();
  const gameProgress = getGameProgress([selectedGameData?.id] as GameKeyEnum[]);
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
          const items: SteamAchievementItem[] = [...response.achievements];

          if (response.noOfLocked > 0) {
            items.push({
              id: 'locked',
              name: `${response.noOfLocked} Locked Achievements`,
              description: 'Unlock these by playing more of the game',
              unlocked: false,
              icon: '',
            });
          }

          setAchievementsState({
            ...achievementsState,
            hasPermission: true,
            items,
            noOfLocked: response.achievements.length + response.noOfLocked,
          });
        }
      }
    };

    fetchData();
  }, [selectedGameData, user.steamId]);

  return {
    viewModel: {
      user,
      gameId: selectedGameData?.id as GameKeyEnum,
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
