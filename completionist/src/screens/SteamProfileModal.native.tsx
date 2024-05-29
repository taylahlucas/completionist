import React, { useRef, useEffect } from 'react';
import {
	Modal,
	Image,
	StyleSheet,
	Animated,
	Dimensions,
	View
} from 'react-native';
import useGetTheme from '@styles/hooks/useGetTheme';
import Overlay from '@components/general/Layouts/Overlay.native';
import Button from '@components/general/Button/Button.native';
import StyledText from '@components/general/Text/StyledText.native';
import Spacing from '@components/general/Spacing.native';
import { SteamProfile } from '@utils/CustomInterfaces';
import { DEFAULT_BORDER_RADIUS } from '@styles/global.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import IconButton from '@components/general/Icon/IconButton.native';
import { IconTypeEnum } from '@utils/CustomEnums';
import useEditUserData from '@data/hooks/useEditUserData.native';
import useMainState from '@redux/hooks/useMainState';

const { height } = Dimensions.get('window');

interface SteamProfileProps {
	profile: SteamProfile;
	isVisible: boolean;
	onClose: () => void;
}

const SteamProfileModal = ({ profile, isVisible = false, onClose }: SteamProfileProps) => {
	const navigation = useReactNavigation();
	const translateY = useRef(new Animated.Value(height)).current;
	const theme = useGetTheme();
	const { updateUserData } = useEditUserData();
	const { user } = useMainState();

	useEffect(() => {
		if (isVisible) {
			Animated.spring(translateY, {
				toValue: 0,
				useNativeDriver: true,
			}).start();
		} else {
			Animated.spring(translateY, {
				toValue: height,
				useNativeDriver: true,
			}).start();
		}
	}, [isVisible]);

	return (
		<Modal transparent animationType="none">
			<Overlay>
				<Animated.View style={[
					styles.modalContainer,
					{ transform: [{ translateY }], backgroundColor: theme.black, }
				]}>
					<View style={styles.contentContainer}>
						<View style={styles.titleContainer}>
							<StyledText
								style={styles.title}
								type='Heading'
								color={theme.lightGrey}
							>
								Confirm Profile
							</StyledText>
							<IconButton
								style={styles.iconButton}
								name={'arrow-down'}
								type={IconTypeEnum.Ionicons}
								color={theme.lightGrey}
								onPress={onClose}
							/>
						</View>

						<Spacing height={32} />
						<Image style={styles.imageContainer} source={{ uri: profile.profileImg }} />
						<Spacing />
						<StyledText type='Heading'>{profile.userName}</StyledText>
						<Spacing />
						<StyledText type='ListItemSubTitleBold'>{`${profile.name} - ${profile.country}`}</StyledText>
						<Spacing />
						<StyledText type='ListItemSubTitleBold'>{`Level: ${profile.level}`}</StyledText>
						<Spacing height={42} />
						<Button style={styles.confirmButton} title={'Confirm'} onPress={(): void => {
							updateUserData({
								...user,
								steamId: profile.steamId
							})
							onClose();
							navigation.goBack();
						}} />
					</View>
				</Animated.View>
			</Overlay>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalContainer: {
		padding: 20,
		borderRadius: 20,
		height: 480,
		top: 64,
	},
	contentContainer: {
		height: 460,
		alignItems: 'center',
	},
	imageContainer: {
		width: 100,
		height: 100,
		padding: 16,
		borderRadius: DEFAULT_BORDER_RADIUS,
	},
	titleContainer: {
		marginTop: 8,
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		paddingRight: 16,
		paddingLeft: 16,
	},
	iconButton: {
		position: 'absolute',
		right: 16
	},
	confirmButton: {
		marginTop: 16
	}
});

export default SteamProfileModal;
