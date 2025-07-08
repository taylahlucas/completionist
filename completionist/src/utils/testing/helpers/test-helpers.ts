import { screen } from '@testing-library/react-native';

export const expectTestIDToMatch = (value: string) =>
  expect(screen.queryByTestId(value)).toBeTruthy();

export const expectTextToMatch = (value: string) =>
  expect(screen.queryByText(value)).toBeTruthy();
