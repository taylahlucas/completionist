import React, { useState } from 'react';
import { Image } from 'react-native';
import StyledText from '@components/general/Text/StyledText.native';
import TextInput from '@components/general/TextInput/TextInput.native';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import Spacing from '@components/general/Spacing.native';
import Button from '@components/general/Button/Button.native';
import { styles } from './SteamAchievementsStyledComponents.native';
import useEndpoints from '@data/api/hooks/useEndpoints.native';
import useMainState from '@redux/hooks/useMainState';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useAuth from '@data/api/hooks/useAuth.native';

const AddSteamIDContent = () => {
	const navigation = useReactNavigation();
	const [steamId, setSteamId] = useState<string>('');
	const { setUser } = useMainDispatch();
	const { user, selectedGameData } = useMainState();
	const { getSteamUserById, updateUserInfo } = useEndpoints();
	const { saveUserData } = useAuth();

	// TODO: Add translations
	return (
		<ScrollableList
			style={styles.scrollStyle} 
			contentContainerStyle={styles.contentScrollStyle}
		>
			<StyledText type={'ListItemSubTitleBold'}>Step 1. Find and add your Steam ID</StyledText>
			<Spacing />
			<StyledText>To find your steam ID, head to Steam and select 'View Profile'.</StyledText>
			<Spacing />
			<StyledText>You can find the ID at the top of your profile. It will look like:</StyledText>
			<Spacing />
			<StyledText>https://steamcommunity.com/profiles/id/</StyledText>
			<TextInput
				placeholder={'Steam ID'}
				value={steamId}
				inputStyle={'text'}
				inputMode={'numeric'}
				onChangeText={(value: string): void => setSteamId(value)}
				onReset={() => setSteamId('')}
			/>
			<Spacing />
			<StyledText type={'ListItemSubTitleBold'}>Step 2. Update your privacy preferences</StyledText>
			<Spacing />
			<StyledText>You will also need to ensure your profile is public.</StyledText>
			<Spacing />
			<StyledText>{`You can do this by heading to Steam Prefences -> Privacy Settings`}</StyledText>
			<Image
				style={{ width: 300, marginTop: -12 }}
				source={require('@styles/images/steam-public-details.png')}
				resizeMode='contain'
			/>
			<Button
				title={'Continue'}
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