import { useGetShowHideOptions } from '@components/custom/settings/hooks';
import { getGameDataFromCache, getMappedGameData } from '@data/index';
import {
  SettingsOptionItem,
  SettingsOptionEnum,
  GameData,
  LanguageType,
  User,
} from '@utils/index';
import { useMainDispatch } from '@redux/hooks';
import { useContentDispatch } from '@components/custom/content-list/provider';
import { useTranslation } from 'react-i18next';

const triggerItem = (
  id: SettingsOptionEnum,
  configs: SettingsOptionItem[],
): SettingsOptionItem[] =>
  configs.map(item => {
    if (item.id === id) {
      return {
        id: item?.id,
        isActive: !item.isActive,
      };
    } else {
      return item;
    }
  });

export const useGameSettings = () => {
  const { i18n } = useTranslation();
  const { setUser, setShouldUpdateUser } = useMainDispatch();
  const { setGameContent } = useContentDispatch();

  const setSettingsOptions = (id: string, user: User) => {
    switch (id) {
      // TODO: Translate id to type
      case 'completed-items':
        setUser({
          ...user,
          settings: {
            ...user.settings,
            configs: triggerItem(
              SettingsOptionEnum.COMPLETED_ITEMS,
              user.settings.configs,
            ),
          },
        });
        setShouldUpdateUser(true);
        return;

      case 'disabled-sections':
        setUser({
          ...user,
          settings: {
            ...user.settings,
            configs: triggerItem(
              SettingsOptionEnum.DISABLED_SECTIONS,
              user.settings.configs,
            ),
          },
        });
        setShouldUpdateUser(true);
        return;
    }
  };

  const onSetGameLanguage = (
    value: string,
    user: User,
    selectedGame: GameData,
  ): void => {
    if (!selectedGame) return;

    let gameData = Object.entries(user.gameData).find(
      item => item[1].id === selectedGame.id,
    );
    if (!gameData) return;

    const updatedGameData: GameData[] = [
      ...user.gameData.filter(item => item.id !== selectedGame.id),
      {
        ...gameData[1],
        lang: value as LanguageType,
      },
    ];

    i18n.changeLanguage(value);
    setUser({
      ...user,
      settings: {
        ...user.settings,
        lang: value as LanguageType,
      },
      gameData: updatedGameData,
    });
    getGameDataFromCache({
      selectedGame: selectedGame.id,
      lang: value as LanguageType,
    }).then(response => {
      const gameData = getMappedGameData(response);
      setGameContent(gameData);
    });
  };

  return {
    setSettingsOptions,
    onSetGameLanguage,
  };
};
