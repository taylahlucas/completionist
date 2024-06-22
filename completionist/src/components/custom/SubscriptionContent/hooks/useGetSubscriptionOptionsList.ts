import { DatePeriodEnum, SubscriptionTypeEnum } from '@utils/CustomEnums';
import { PriceProps } from '@utils/CustomInterfaces';
import { useTranslation } from 'react-i18next';

export interface SubscriptionOptionsListProps {
	id: SubscriptionTypeEnum;
	prices: PriceProps[];
	title: string;
	description: string[];
}

const useGetSubscriptionOptionsList = (): SubscriptionOptionsListProps[] => {
	const { t } = useTranslation();

	return [
		// {
		// 	id: SubscriptionTypeEnum.PREMIUM,
		// 	prices: [
		// 		{
		// 			type: DatePeriodEnum.MONTHLY,
		// 			title: t('common:subscriptions.monthly'),
		// 			value: 2.99
		// 		},
		// 		{
		// 			type: DatePeriodEnum.YEARLY,
		// 			title: t('common:subscriptions.yearly'),
		// 			value: 29.99
		// 		}
		// 	],
		// 	title: t('common:subscriptions.premium'),
		// 	description: [
		// 		t('common:subscriptions.accessPremiumFeatures'),
		// 		t('common:subscriptions.accessAllGames')
		// 	]
		// },
		// {
		// 	id: SubscriptionTypeEnum.FREE,
		// 	prices: [
		// 		{
		// 			type: DatePeriodEnum.MONTHLY,
		// 			title: t('common:subscriptions.monthly'),
		// 			value: 0.00
		// 		}
		// 	],
		// 	title: t('common:subscriptions.free'),
		// 	description: [
		// 		t('common:subscriptions.withAds'),
		// 		t('common:subscriptions.revokedAccess'),
		// 		t('common:subscriptions.accessOneGame')
		// 	]
		// },
	];
};

export default useGetSubscriptionOptionsList;