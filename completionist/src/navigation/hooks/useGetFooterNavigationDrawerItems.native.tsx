import { IconTypeEnum, ScreenEnum } from '@utils/CustomEnums';
import { IconType } from '@utils/CustomTypes';
import { useTranslation } from 'react-i18next';

interface NavigationFooterDrawerItem {
	id: ScreenEnum;
	title: string;
	icon: IconType;
	iconType?: IconTypeEnum;
}

const useGetNavigationFooterDrawerItems = (): NavigationFooterDrawerItem[] => {
	const { t } = useTranslation();

	return ([
		{
			id: ScreenEnum.GameSelection,
			title: t('common:screens.gameSelection'),
			icon: 'menu-sharp',
			iconType: IconTypeEnum.Ionicons
		},
		{
			id: ScreenEnum.SteamAchievements,
			// TODO: Translations && fix logic here to only work for premium
			title: 'Steam Achievements',
			icon: 'steam',
			iconType: IconTypeEnum.MaterialCommunityIcons
		},
		{
			id: ScreenEnum.Subscriptions,
			title: t('common:screens.subscriptions'),
			icon: 'wallet-outline',
			iconType: IconTypeEnum.Ionicons
		},
		{
			id: ScreenEnum.RequestGame,
			title: t('common:screens.sendRequest'),
			icon: 'forward-to-inbox'
		},
		{
			id: ScreenEnum.Settings,
			title: t('common:screens.settings'),
			icon: 'settings-outline',
			iconType: IconTypeEnum.Ionicons
		}
	]);
};

export default useGetNavigationFooterDrawerItems;