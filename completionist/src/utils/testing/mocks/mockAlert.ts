import { Alert } from 'react-native';

export const mockAlert = (mock: jest.Mock = jest.fn()) => {
  return jest.spyOn(Alert, 'alert')
    .mockImplementation(mock);
};