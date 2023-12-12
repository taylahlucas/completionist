import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_KEY = 'REST_GET_CACHE';
const CACHE_EXPIRY_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

interface CachedData {
  data: any;
  timestamp: number;
}

const useCache = () => {
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

  const saveToCache = async (data: any): Promise<void> => {
    try {
      const timestamp = new Date().getTime();
      const cacheData: CachedData = { data, timestamp };
      const cacheDataString = JSON.stringify(cacheData);

      await AsyncStorage.setItem(CACHE_KEY, cacheDataString);
    } catch (error) {
      console.error('Error saving to cache:', error);
    }
  };

  const fetchData = async (): Promise<any | null> => {
    // Check if data is in cache
    const cachedData = await getFromCache();

    if (cachedData !== null) {
      // Data found in cache, return it
      return cachedData;
    }

    // If not in cache, fetch data from the server
    // TODO: add url based on userId
    // try {
    //   const response = await fetch('https://api.example.com/data');
    //   const data = await response.json();

    //   // Save the fetched data to the cache
    //   await saveToCache(data);

    //   return data;
    // } catch (error) {
    //   console.error('Error fetching data:', error);
    //   return null;
    // }
  };

  return {
    getFromCache,
    fetchData,
    saveToCache
  }
};

export default useCache;