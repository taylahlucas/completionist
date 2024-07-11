// import React from 'react';
// import { useTranslation } from 'react-i18next';
// import StandardLayout from '@components/general/Layouts/StandardLayout.native';
// import NavigationHeader from '@navigation/NavigationHeader.native';
// import SubscriptionContent from '@components/custom/SubscriptionContent/SubscriptionContent.native';
// import useMainState from '@redux/hooks/useMainState';
// import { AuthScreenEnum } from '@utils/CustomEnums';

// const Subscriptions = () => {
// 	const { t } = useTranslation();
// 	const { selectedGame } = useMainState();
	
// 	return (
// 		<StandardLayout>
// 			<NavigationHeader
// 				id={AuthScreenEnum.Subscriptions}
// 				title={t('common:screens.subscriptions')}
// 				leftAction={!!selectedGame ? 'menu' : 'back'}
// 			/>
// 			<SubscriptionContent />
// 		</StandardLayout>
// 	)
// };

// export default Subscriptions;