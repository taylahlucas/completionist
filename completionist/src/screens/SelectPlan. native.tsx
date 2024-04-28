import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import StyledText from '@components/general/Text/StyledText.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import SubscriptionContent from '@components/custom/SubscriptionContent/SubscriptionContent.native';

const SelectPlan = () => {
	return (
		<StandardLayout>
			<NavigationHeader title={'Select a Plan'} leftAction='none' />
				<StyledText>Would you like to subscribe to Premium?</StyledText>
				<SubscriptionContent />
		</StandardLayout>
	);
};

export default SelectPlan;