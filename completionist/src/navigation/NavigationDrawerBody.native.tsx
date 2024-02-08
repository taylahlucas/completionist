import React from 'react';
import {
	NavigationDrawerBodyContainer,
	NavigationDrawerFooter,
	NavigationDrawerTitle,
	NavigationDrawerFooterItem,
	NavigationDrawerFooterIcon
} from './NavigationStyledComponents.native';
import useReactNavigation from './hooks/useReactNavigation.native';
import useGetNavigationDrawerItems from './hooks/useGetNavigationDrawerItems.native';
import useGetLoginMethods from '@components/custom/LoginForm/hooks/useGetLoginMethods';
import { ScreenEnum } from '@utils/CustomEnums';
import useGetTheme from '@styles/hooks/useGetTheme';
import useMainState from '@redux/hooks/useMainState';
import useGetNavigationFooterDrawerItems from './hooks/useGetFooterNavigationDrawerItems.native';
import NavigationDrawerItem from './NavigationDrawerItem.native';
import { useTranslation } from 'react-i18next';
import Icon from '@components/general/Icon/Icon.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';

const NavigationDrawerBody: React.FunctionComponent = () => {
	const { t } = useTranslation();
	const navigation = useReactNavigation();
	const theme = useGetTheme();
	const { setSelectedGame } = useMainDispatch();
	const { currentScreen } = useMainState();
	const drawerItems = useGetNavigationDrawerItems();
	const footerItems = useGetNavigationFooterDrawerItems();
	const { signOut } = useGetLoginMethods();

	return (
		<NavigationDrawerBodyContainer>
			{drawerItems.map((item, index) => (
				<NavigationDrawerItem key={index} item={item} isActive={currentScreen === item.id} />
			))}
			<NavigationDrawerFooter>
				{footerItems.map((item, index) => (
					<NavigationDrawerFooterItem key={index} onPress={(): void => {
						if (item.id === ScreenEnum.GameSelection) {
							setSelectedGame(undefined);
						}
						navigation.navigate(item.id);
						}}>
						<NavigationDrawerFooterIcon
							name={item.icon}
							type={item.iconType}
							color={theme.lightGrey}
							size={24}
						/>
						<NavigationDrawerTitle
							type={'ListItemTitle'}
							color={currentScreen === item.id ? theme.lightGrey : theme.midGrey}
							align={'left'}
							ellipsizeMode='tail'
							numberOfLines={1}
						>
							{item.title}
						</NavigationDrawerTitle>
					</NavigationDrawerFooterItem>
				))}
				<NavigationDrawerFooterItem onPress={signOut}>
					<NavigationDrawerFooterIcon
						style={{ marginLeft: 4 }}
						name={'logout'}
						color={theme.lightGrey}
						size={24}
					/>
					<NavigationDrawerTitle
						type={'ListItemTitle'}
						color={currentScreen === ScreenEnum.Login ? theme.lightGrey : theme.midGrey}
						align={'left'}
						ellipsizeMode='tail'
						numberOfLines={1}
					>
						{t('common:auth.logout')}
					</NavigationDrawerTitle>
				</NavigationDrawerFooterItem>
			</NavigationDrawerFooter>
		</NavigationDrawerBodyContainer>
	);
};

export default NavigationDrawerBody;
