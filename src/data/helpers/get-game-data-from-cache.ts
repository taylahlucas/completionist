import {
  DEFAULT_LANG,
  GameContentItem,
  GameKeyEnum,
  LanguageType,
} from '@utils/index';
import {
  fetchGameDataFromCache,
  getAllKeys,
  removeItemFromCache,
  saveToCache,
} from '@data/index';
import { getGameData } from '@api/';
import { Alert } from 'react-native';
import { log } from '@utils/helpers/index';

interface GetGameDataFromCacheProps {
  selectedGame: GameKeyEnum;
  lang?: LanguageType;
}

// TODO: If this is stored in redux persist, we should remove it from the cache
// Get game data from cache or api
export const getGameDataFromCache = async ({
  selectedGame,
  lang = DEFAULT_LANG,
}: GetGameDataFromCacheProps): Promise<GameContentItem[]> => {
  const newKey = `${selectedGame}-${lang}`;
  try {
    // Try to get cached data first
    const cachedData = await fetchGameDataFromCache(newKey);
    if (cachedData) return cachedData;

    // If no game data is cached, fetch from API/database
    const response = await getGameData({ game: selectedGame, lang });

    if (response) {
      await saveToCache(response, newKey);

      // Remove other databases from cache
      await getAllKeys().then(keys => {
        keys.forEach((key: string) => {
          if (key.includes(selectedGame) && key !== newKey) {
            removeItemFromCache(key);
          }
        });
      });

      return response;
    } else {
      log({
        type: 'error',
        title: 'Failed to fetch game data',
        data: {
          key: newKey,
        },
      });
      // TODO: Add to translations
      Alert.alert(
        'Could not get game data',
        'Please close the app and try again.',
      );
      return [];
    }
  } catch (e: any) {
    log({
      type: 'error',
      title: 'Failed to fetch game data',
      data: {
        error: JSON.stringify(
          {
            message: e?.message,
            name: e?.name,
            code: e?.code,
            url: e?.config?.url,
          },
          null,
          2,
        ),
      },
    });
    return [];
  }
};
