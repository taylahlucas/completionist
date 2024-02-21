import React, { useState } from 'react';
import { Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import StyledText from '@components/general/Text/StyledText.native';
import TextInput from '@components/general/TextInput/TextInput.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import Spacing from '@components/general/Spacing.native';
import Button from '@components/general/Button/Button.native';
import { styles } from './SteamAchievementsStyledComponents.native';
import useEndpoints from '@data/api/hooks/useEndpoints.native';
import useMainState from '@redux/hooks/useMainState';
import useAuth from '@data/api/hooks/useAuth.native';

const AddSteamIDContent = () => {
	const { t } = useTranslation();
	const [steamId, setSteamId] = useState<string>('');
	const { user, selectedGameData } = useMainState();
	const { getSteamUserById } = useEndpoints();
	const { saveUserData } = useAuth();
	
	return (
		<ScrollableList
			style={styles.scrollStyle} 
			contentContainerStyle={styles.contentScrollStyle}
		>
			<StyledText type={'ListItemSubTitleBold'}>{t('common:steamAchievements.addSteamIdDesc1')}</StyledText>
			<Spacing />
			<StyledText>{t('common:steamAchievements.addSteamIdDesc2')}</StyledText>
			<Spacing />
			<StyledText>{t('common:steamAchievements.addSteamIdDesc3')}</StyledText>
			<Spacing />
			<StyledText>https://steamcommunity.com/profiles/id/</StyledText>
			<TextInput
				placeholder={t('common:steamAchievements.steamIdPlaceholder')}
				value={steamId}
				inputStyle='text'
				inputMode='numeric'
				onChangeText={(value: string): void => setSteamId(value)}
				onReset={() => setSteamId('')}
			/>
			<Spacing />
			<StyledText type={'ListItemSubTitleBold'}>{t('common:settings.addSteamIdStep2')}</StyledText>
			<Spacing />
			<StyledText>{t('common:settings.addSteamIdDesc3')}</StyledText>
			<Spacing />
			<StyledText>{t('common:settings.addSteamIdDesc4')}</StyledText>
			<Image
				style={{ width: 300, marginTop: -12 }}
				source={require('@styles/images/steam-public-details.png')}
				resizeMode='contain'
			/>
			<Button
				title={t('common:continue')}
				disabled={steamId.length < 17}
				onPress={async (): Promise<void> => {
					const verifiedSteamId = await getSteamUserById(selectedGameData?.appId ?? '', steamId);

					if (!!verifiedSteamId) {
						saveUserData({
							...user,
							steamId: verifiedSteamId
						});
					}
				}}
			/>
		</ScrollableList>
	);
};

export default AddSteamIDContent;