import { GameKeyEnum } from '@utils/CustomEnums';
import { GameContentItem } from '@utils/CustomInterfaces';
import { fetchGameDataFromCache, saveToCache } from '@data/cache/localCache';
import { Alert } from 'react-native';
import { getGameData } from '@data/api/endpoints';

// Get game data from cache or api
export const getGameDataFromCache = async (
  selectedGame: GameKeyEnum,
): Promise<GameContentItem[]> => {
  try {
    // Try to get cached data first
    const cachedData = await fetchGameDataFromCache(selectedGame);
    console.log('Cached data');
    if (cachedData) return cachedData;

    // If no cache, fetch from API/database
    const response = await getGameData({ game: selectedGame, lang: 'en' });
    if (response) {
      await saveToCache(response, selectedGame);
      return response;
    } else {
      Alert.alert(
        'Could not get game data',
        'Please close the app and try again.',
      );
      return [];
    }
  } catch (error) {
    console.error('Error fetching game data:', error);
    return [];
  }
};
