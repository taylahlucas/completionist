import AsyncStorage from '@react-native-async-storage/async-storage';
import { CACHE_EXPIRY_TIME, USER_CACHE_KEY } from '@utils/constants';
import { CachedData, User } from '@utils/CustomInterfaces';
import { UserResponse } from '@utils/CustomTypes';

interface CacheReturnType {
  saveToCache: (data: User, key?: string) => Promise<void>;
	getFromCache: (key?: string) => Promise<any>;
  fetchUserFromCache: (userId: string) => Promise<UserResponse>;
  clearCache: () => Promise<void> ;
}

const useCache = (): CacheReturnType => {  
  const getFromCache = async (key?: string): Promise<any | null> => {
    try {
      const cachedDataString = await AsyncStorage.getItem(key ? key : USER_CACHE_KEY);
      
      if (cachedDataString) {
        const { data, timestamp }: CachedData = JSON.parse(cachedDataString);
        const currentTime = new Date().getTime();

        if (currentTime - timestamp < CACHE_EXPIRY_TIME) {
          // Cache is still valid, return the cached data
          return data;
        } else {
          // Cache has expired, remove it
          await AsyncStorage.removeItem(key ? key : USER_CACHE_KEY);
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

  const saveToCache = async (data: any,  key?: string): Promise<void> => {
    try {
      const timestamp = new Date().getTime();
      const cacheData: CachedData = { data, timestamp };
      const cacheDataString = JSON.stringify(cacheData);

      await AsyncStorage.setItem(key ? key : USER_CACHE_KEY, cacheDataString);
    } catch (error) {
      console.error('Error saving to cache:', error);
    }
  };

  const clearCache = async (): Promise<void> => {
		try {
			await AsyncStorage.clear();
			console.log('Cache cleared!');
		} catch (e) {
			console.log('Failed to clear the cache', e);
		}
  };

  return {
    fetchUserFromCache,
		getFromCache,
    saveToCache,
    clearCache
  }
};

export default useCache;
