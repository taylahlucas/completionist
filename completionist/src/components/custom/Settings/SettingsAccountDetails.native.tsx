import React from 'react';
import { useTranslation } from 'react-i18next';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import useMainState from '@redux/hooks/useMainState';
import StyledText from '@components/general/Text/StyledText.native';
import Button from '@components/general/Button/Button.native';
import { AuthScreenEnum, DrawerScreenEnum } from '@utils/CustomEnums';
import { SettingsEmail } from './SettingsStyledComponents.native';
import useGetTheme from '@styles/hooks/useGetTheme';

const SettingsAccountDetails = () => {
	const navigation = useReactNavigation();
	const theme = useGetTheme();
	const { t } = useTranslation();
	const { user, selectedGame } = useMainState();
	const isGlobalSettings = !selectedGame

	return (
		<>
			{/* <Condition condition={!!user.userAvatar}>
				<SettingsAvatarContainer
					source={{ uri: user.userAvatar }}
				/>
			</Condition> */}
			<StyledText type='ListItemTitleBold'>
				{user.username}
			</StyledText>
			<SettingsEmail type='ListItemTitleBold'>
				{user.email}
			</SettingsEmail>
			<Button
				type='navigation'
				color={theme.primaryPurple}
				title={t('common:settings.changeAccountDetails')}
				onPress={(): void => navigation.navigate(isGlobalSettings ? AuthScreenEnum.GlobalAccountDetails : DrawerScreenEnum.AccountDetails)}
			/>
		</>
	);
};

export default SettingsAccountDetails;