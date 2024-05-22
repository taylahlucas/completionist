import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Condition from '@components/general/Condition.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import useMainState from '@redux/hooks/useMainState';
import StyledText from '@components/general/Text/StyledText.native';
import Button from '@components/general/Button/Button.native';
import { DrawerScreenEnum } from '@utils/CustomEnums';
import { SettingsAvatarContainer, SettingsEmail } from './SettingsStyledComponents.native';
import useGetTheme from '@styles/hooks/useGetTheme';

const SettingsAccountDetails = () => {
	const navigation = useReactNavigation();
	const theme = useGetTheme();
	const { t } = useTranslation();
	const { user } = useMainState();

	return (
		<>
			<Condition condition={!!user.userAvatar}>
				<SettingsAvatarContainer
					source={{ uri: user.userAvatar }}
				/>
			</Condition>
			<StyledText type='ListItemTitleBold'>
				{user.name}
			</StyledText>
			<SettingsEmail type='ListItemTitleBold'>
				{user.email}
			</SettingsEmail>
			<Button
				type='navigation'
				color={theme.primaryPurple}
				title={t('common:settings.changeAccountDetails')}
				onPress={(): void => navigation.navigate(DrawerScreenEnum.AccountDetails)}
			/>
		</>
	);
};

export default SettingsAccountDetails;