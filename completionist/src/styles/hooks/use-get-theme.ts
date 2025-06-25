import { darkTheme } from '../colors';

const useGetTheme = () => {
  // TODO: Uncomment when light theme is added
  // const isDarkMode = useColorScheme() === 'dark';
  // const theme = isDarkMode ? darkTheme
  return darkTheme;
};

export default useGetTheme;