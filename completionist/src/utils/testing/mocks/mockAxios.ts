import axios from 'axios';

// jest.mock('axios');

// export const mockAxiosPost = (responseData = {}, error = null) => {
//   const mockedAxiosPost = axios.post as jest.MockedFunction<typeof axios.post>;

//   if (error) {
//     mockedAxiosPost.mockRejectedValue(error);
//   }
//   else {
//     mockedAxiosPost.mockResolvedValue({ data: responseData });
//   }
// };
export const mockAxiosPost = (responseData = {}, error = null) => {
  return jest.spyOn(axios, 'post')
    .mockImplementation(() => new Promise((resolve, reject) => {
      if (error) {
        reject(error);
      }
      else {
        resolve({ data: responseData });
      }
    }))
};