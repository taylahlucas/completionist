import * as useReactNavigation from '@navigation/hooks/use-react-navigation';

export const navigationSpy = ({
  navigate,
  dispatch,
  goBack,
}: {
  navigate?: jest.Mock;
  dispatch?: jest.Mock;
  goBack?: jest.Mock;
}) => {
  return jest.spyOn(useReactNavigation, 'useReactNavigation').mockReturnValue({
    navigate: navigate ?? jest.fn(),
    dispatch: dispatch ?? jest.fn(),
    goBack: goBack ?? jest.fn(),
    setOptions: jest.fn(),
  });
};
