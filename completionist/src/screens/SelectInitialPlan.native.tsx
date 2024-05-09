import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import SubscriptionContent from '@components/custom/SubscriptionContent/SubscriptionContent.native';
import { UnauthorizedScreenEnum } from '@utils/CustomEnums';

const SelectInitialPlan = () => {
	return (
		<StandardLayout>
			<NavigationHeader id={UnauthorizedScreenEnum.SelectInitialPlan} title={'Select a Plan'} leftAction='none' />
			<SubscriptionContent />
		</StandardLayout>
	);
};

export default SelectInitialPlan;