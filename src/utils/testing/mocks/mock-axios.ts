import axios from 'axios';

export const mockAxiosPost = (responseData = {}, error = null) => {
  return jest.spyOn(axios, 'post').mockImplementation(
    () =>
      new Promise((resolve, reject) => {
        if (error) {
          reject(error);
        } else {
          resolve({ data: responseData });
        }
      }),
  );
};
