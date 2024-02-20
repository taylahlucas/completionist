import React from 'react';
import Condition from '@components/general/Condition.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import useMainState from '@redux/hooks/useMainState';
import StyledText from '@components/general/Text/StyledText.native';
import Button from '@components/general/Button/Button.native';
import { ScreenEnum } from '@utils/CustomEnums';
import SettingsGameSelectionContent from './SettingsGameSelectionContent.native';
import { SettingsContentAvatarContainer, SettingsContentEmail } from './SettingsContentStyledComponents.native';

const SettingsContentAccountDetails = () => {
	const navigation = useReactNavigation();
	const { user } = useMainState();

	return (
		<>
			<Condition condition={!!user.userAvatar}>
				<SettingsContentAvatarContainer
					source={{ uri: user.userAvatar }}
				/>
			</Condition>
			<StyledText type='ListItemTitleBold'>
				{user.name}
			</StyledText>
			<SettingsContentEmail type='ListItemTitleBold'>
				{user.email}
			</SettingsContentEmail>
			<Button
				type='navigation'
				title={'Change Account Details'}
				onPress={(): void => navigation.navigate(ScreenEnum.AccountDetails)}
			/>
			<SettingsGameSelectionContent />
		</>
	);
};

export default SettingsContentAccountDetails;