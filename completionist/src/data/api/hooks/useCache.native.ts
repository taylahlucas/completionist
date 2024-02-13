import AsyncStorage from '@react-native-async-storage/async-storage';
import { CACHE_EXPIRY_TIME, CACHE_KEY } from '@utils/constants';
import { CachedData, User } from '@utils/CustomInterfaces';
import { UserResponse } from '@utils/CustomTypes';

interface CacheReturnType {
  saveToCache: (data: User) => Promise<void>;
  fetchUserFromCache: (userId: string) => Promise<UserResponse>;
  clearCache: () => Promise<void> ;
}

const useCache = (): CacheReturnType => {  
  const getFromCache = async (): Promise<any | null> => {
    try {
      const cachedDataString = await AsyncStorage.getItem(CACHE_KEY);
      
      if (cachedDataString) {
        const { data, timestamp }: CachedData = JSON.parse(cachedDataString);
        const currentTime = new Date().getTime();

        if (currentTime - timestamp < CACHE_EXPIRY_TIME) {
          // Cache is still valid, return the cached data
          return data;
        } else {
          // Cache has expired, remove it
          await AsyncStorage.removeItem(CACHE_KEY);
        }
      }
    } catch (error) {
      console.error('Error reading from cache:', error);
    }

    return null; // Cache miss or expired
  };

	const fetchUserFromCache = async (): Promise<UserResponse> => {
    // Check if user is in cache
    const cachedData = await getFromCache();
		
    if (!!cachedData?.userId && cachedData as User) {
      return cachedData;
    }
		return;
  };

  const saveToCache = async (data: User): Promise<void> => {
    try {
      const timestamp = new Date().getTime();
      const cacheData: CachedData = { data, timestamp };
      const cacheDataString = JSON.stringify(cacheData);

      await AsyncStorage.setItem(CACHE_KEY, cacheDataString);
    } catch (error) {
      console.error('Error saving to cache:', error);
    }
  };

  const clearCache = async (): Promise<void> => {
    const cachedData = await getFromCache();
    if (!!cachedData) {
      try {
        await AsyncStorage.clear();
      } catch (error) {
        console.error('Could not clear cache: ', error);
        return;
      }
    }
  };

  return {
    fetchUserFromCache,
    saveToCache,
    clearCache
  }
};

export default useCache;
