import AsyncStorage from '@react-native-async-storage/async-storage';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import { CACHE_EXPIRY_TIME, CACHE_KEY } from '@utils/constants';
import { CachedData, User } from '@utils/CustomInterfaces';
import { UserResponse } from '@utils/CustomTypes';
import useEndpoints from './useEndpoints';
import useKeychain from './useKeychain.native';

interface CacheReturnType {
  getFromCache: () => Promise<any | null>;
  saveToCache: (data: User) => Promise<void>;
  fetchDataFromCache: (userId: string) => Promise<UserResponse>;
  clearCache: () => Promise<void> ;
}

const useCache = (): CacheReturnType => {
  const { setUser, setLoggedIn } = useMainDispatch();
  const { getUserByUserId } = useEndpoints();
  const { deleteCredentials } = useKeychain();
  
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

  const fetchDataFromCache = async (userId: string): Promise<UserResponse> => {
    // Check if data is in cache
    const cachedData = await getFromCache();

    if (!!cachedData?.userId && cachedData as User) {
      return cachedData;
    }

    // If not in cache, fetch data from the server
    try {
      return await getUserByUserId({ userId })
        .then((response: UserResponse) => {
          if (!!response) {
            setUser(response);
            return response;
          }
          else {
            clearCache();
            deleteCredentials();
            setLoggedIn(false);
            return null;
          }
        })
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  const clearCache = async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
      console.log('Cache cleared successfully');
    } catch (error) {
      console.error('Could not clear cache');
      return;
    }
  };

  return {
    getFromCache,
    fetchDataFromCache,
    saveToCache,
    clearCache
  }
};

export default useCache;