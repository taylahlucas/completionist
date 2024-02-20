import React from 'react';
import { NavigationHeaderRightActionTypes } from '@utils/CustomTypes';
import {
  styles,
  NavigationEmptyContainer
} from '@navigation/NavigationStyledComponents.native';
import { IconTypeEnum } from '@utils/CustomEnums';
import useGetTheme from '@styles/hooks/useGetTheme';
import IconButton from '@components/general/Icon/IconButton.native';
import useGetLoginMethods from '@components/custom/LoginForm/hooks/useGetLoginMethods';

const useGetRightNavigationItem = (rightAction: NavigationHeaderRightActionTypes): JSX.Element => {
  const theme = useGetTheme();
	const { signOut } = useGetLoginMethods();

  switch (rightAction) {
    case 'logout':
      return (
        <IconButton
          style={styles.iconButton}
          name={'logout'}
          color={theme.lightGrey}
          size={30}
          onPress={signOut}
        />
      );
		case 'filter':
			return (
        <IconButton
          style={styles.iconButton}
          name={'filter-outline'}
					type={IconTypeEnum.MaterialCommunityIcons}
          color={theme.lightGrey}
          size={40}
          onPress={() => {
						console.log("SHOW FILTER")
					}}
        />
      );
    default:
      return (
        <NavigationEmptyContainer />
      );
  }
};

export default useGetRightNavigationItem;