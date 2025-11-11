import { useEffect, useState } from 'react';
import axios from 'axios';

export const useIsRequestLoading = (): boolean => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(config => {
      if (!config?.url?.includes('exists')) {
        setIsLoading(true);
      }
      return config;
    });

    // Axios response interceptor to clear loading state on response
    const responseInterceptor = axios.interceptors.response.use(
      response => {
        setIsLoading(false);
        return response;
      },
      _ => {
        setIsLoading(false);
        return;
      },
    );

    // Cleanup function to remove interceptors when component unmounts
    return () => {
      setIsLoading(false);
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return isLoading;
};
