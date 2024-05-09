import { IconTypeEnum, AuthScreenEnum } from '@utils/CustomEnums';
import { IconType } from '@utils/CustomTypes';
import { useTranslation } from 'react-i18next';

interface NavigationFooterDrawerItem {
	id: AuthScreenEnum;
	title: string;
	icon: IconType;
	iconType?: IconTypeEnum;
}

const useGetNavigationFooterDrawerItems = (): NavigationFooterDrawerItem[] => {
	const { t } = useTranslation();

	return ([
		{
			id: AuthScreenEnum.GameSelection,
			title: t('common:screens.gameSelection'),
			icon: 'menu-sharp',
			iconType: IconTypeEnum.Ionicons
		},
		{
			id: AuthScreenEnum.SteamAchievements,
			// TODO: Translations && fix logic here to only work for premium
			title: t('common:screens.steamAchievements'),
			icon: 'steam',
			iconType: IconTypeEnum.MaterialCommunityIcons
		},
		{
			id: AuthScreenEnum.Subscriptions,
			title: t('common:screens.subscriptions'),
			icon: 'wallet-outline',
			iconType: IconTypeEnum.Ionicons
		},
		{
			id: AuthScreenEnum.SendRequest,
			title: t('common:screens.sendRequest'),
			icon: 'forward-to-inbox'
		},
		{
			id: AuthScreenEnum.Settings,
			title: t('common:screens.settings'),
			icon: 'settings-outline',
			iconType: IconTypeEnum.Ionicons
		}
	]);
};

export default useGetNavigationFooterDrawerItems;