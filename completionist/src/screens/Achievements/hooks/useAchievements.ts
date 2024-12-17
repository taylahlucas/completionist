import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useMainState from '@redux/hooks/useMainState';
import useEndpoints from '@data/api/hooks/useEndpoints.native';
import { AchievementItem } from '@utils/CustomInterfaces';
import { useEditUserData, useGetGameProgressData } from '@data/hooks/index';
import { getCurrentGame } from '@data/hooks/index';

interface AchievementsState {
  isOpen: boolean;
  hasPermission: boolean;
  items: AchievementItem[];
  noOfLocked: number;
}

const useAchievements = () => {
  const { t } = useTranslation();
  const { user, selectedGame } = useMainState();
  const { getSteamPlayerAchievements } = useEndpoints();
  const { updateUserData } = useEditUserData();
  // const [badgesOpen, setBadgesOpen] = useState<boolean>(true);
  const [progressViewOpen, setProgressViewOpen] = useState<boolean>(true);
  const [currentAchievementOpen, setCurrentAchievementOpen] =
    useState<string>('');
  const [achievementsState, setAchievementsState] = useState<AchievementsState>(
    {
      isOpen: true,
      hasPermission: !!user.steamId,
      items: [],
      noOfLocked: 0,
    },
  );
  const activeGames = user.gameData;
  const currentGame = getCurrentGame(
    selectedGame?.id ?? user.gameData[0].id,
    user,
  );
  const { getGameProgress } = useGetGameProgressData();
  const isGlobalAchievements = !selectedGame;

  useEffect(() => {
    const fetchData = async () => {
      const currentGameId = selectedGame
        ? currentGame?.appId
        : activeGames[0].appId;

      if (!currentGameId) {
        // TODO: Could not find any game id
        console.log('TEST could not find any game id');
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
          const items: AchievementItem[] =
            response?.noOfLocked > 0
              ? [
                  ...response?.achievements,
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
            items: items,
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
      achievements: {
        isGlobalAchievements,
        achievementsState,
        currentAchievementOpen,
        activeGames,
        progressViewOpen,
        selectedGame,
      },
      steamAchievements: {
        title: !user.steamId
          ? t('common:screens.addSteamId')
          : t('common:screens.steamAchievements'),
      },
    },
    actions: {
      setAchievementsState,
      setCurrentAchievementOpen,
      setProgressViewOpen,
      getGameProgress,
      updateUserData,
    },
  };
};

export default useAchievements;
