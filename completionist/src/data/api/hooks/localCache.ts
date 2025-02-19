import AsyncStorage from '@react-native-async-storage/async-storage';
import { log } from '@utils/hooks/index';
import {
  CACHE_EXPIRY_TIME,
  CachedData,
  User,
  UserResponse,
} from '@utils/index';

const getFromCache = async (key: string): Promise<any | null> => {
  try {
    const cachedDataString = await AsyncStorage.getItem(key);

    if (cachedDataString) {
      const { data, timestamp }: CachedData = JSON.parse(cachedDataString);
      const currentTime = new Date().getTime();

      if (currentTime - timestamp < CACHE_EXPIRY_TIME) {
        // Cache is still valid, return the cached data
        return data;
      } else {
        // Cache has expired, remove it
        await AsyncStorage.removeItem(key);
      }
    }
  } catch (error) {
    log({
      type: 'error',
      title: 'Failed to read to local cache',
      data: {
        error: JSON.stringify(error, null, 2),
      },
    });
  }

  return null; // Cache miss or expired
};

export const fetchUserFromCache = async (
  key: string,
): Promise<UserResponse> => {
  // Check if user is in cache
  console.log('key: ', key);
  const cachedData = await getFromCache(key);

  if (!!cachedData?.userId && (cachedData as User)) {
    log({
      type: 'info',
      title: `Fetched user from local cache with key: ${key}`,
    });
    return cachedData;
  }
  return;
};

export const saveToCache = async (data: any, key: string): Promise<void> => {
  try {
    const timestamp = new Date().getTime();
    const cacheData: CachedData = { data, timestamp };
    const cacheDataString = JSON.stringify(cacheData);

    await AsyncStorage.setItem(key, cacheDataString);
    log({
      type: 'info',
      title: `Saved user to local cache with key: ${key}`,
    });
  } catch (error) {
    log({
      type: 'error',
      title: 'Failed to save to local cache',
      data: {
        error: JSON.stringify(error, null, 2),
      },
    });
  }
};

export const clearCache = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
    log({
      type: 'info',
      title: 'Local Cache cleared!',
    });
  } catch (e) {
    log({
      type: 'error',
      title: 'Failed to clear the local cache',
      data: {
        error: JSON.stringify(e, null, 2),
      },
    });
  }
};
