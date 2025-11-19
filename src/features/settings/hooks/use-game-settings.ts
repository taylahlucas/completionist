import {
  getGameDataFromCache,
  getMappedGameData,
  updateUser,
  useEditUserData,
} from '@data/index';
import {
  SettingsOptionItem,
  SettingsOptionEnum,
  GameData,
  LanguageType,
  User,
} from '@utils/index';
import { useContentDispatch } from '@features/game-content/provider';
import { useTranslation } from 'react-i18next';
import { userWithUpdatedGameLanguage } from '@utils/helpers/index';
import { useAuthDispatch } from '@redux/auth';
import { useMainDispatch } from '@redux/hooks';

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
  const { setUser } = useAuthDispatch();
  const { setShouldUpdateUser } = useMainDispatch();
  const { setGameContent } = useContentDispatch();
  const { saveUser } = useEditUserData();

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
    selectedGameData: GameData,
  ): void => {
    const updatedUser = userWithUpdatedGameLanguage(
      value,
      user,
      selectedGameData,
    );
    i18n.changeLanguage(value);

    getGameDataFromCache({
      selectedGame: selectedGameData.id,
      lang: value as LanguageType,
    }).then(response => {
      const gameData = getMappedGameData(response);
      setGameContent(gameData);

      updateUser(updatedUser).then(() => {
        saveUser(updatedUser);
      });
    });
  };

  return {
    setSettingsOptions,
    onSetGameLanguage,
  };
};
