import React, { useRef, useEffect } from 'react';
import {
  Modal,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
  View,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import useGetTheme from '@styles/hooks/use-get-theme';
import Overlay from '@components/general/layouts/overlay';
import Button from '@components/general/button/button';
import StyledText from '@components/general/text/styled-text';
import { SteamProfile } from '@utils/index';
import { DEFAULT_BORDER_RADIUS, windowHeight } from '@styles/global';
import { useReactNavigation } from '@navigation/hooks';
import IconButton from '@components/general/icon/icon-button';
import { IconTypeEnum } from '@utils/custom-enums';
import { Condition, Spacing } from '@components/general/index';
import { isSmallScreen } from '@styles/global';
import { useAchievements } from './hooks';

type ProfileViewType = 'add' | 'view';

interface SteamProfileProps {
  profile: SteamProfile;
  isVisible: boolean;
  viewType?: ProfileViewType;
  onClose: () => void;
}

export const SteamProfileModal = ({
  profile,
  isVisible = false,
  viewType = 'view',
  onClose,
}: SteamProfileProps) => {
  const { t } = useTranslation();
  const navigation = useReactNavigation();
  const translateY = useRef(new Animated.Value(windowHeight)).current;
  const theme = useGetTheme();
  const { viewModel, actions } = useAchievements();

  useEffect(() => {
    if (isVisible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(translateY, {
        toValue: windowHeight,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  return (
    <Modal transparent animationType="none">
      <Overlay>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ translateY }], backgroundColor: theme.black },
          ]}>
          <View style={styles.contentContainer}>
            <View style={styles.titleContainer}>
              <StyledText
                style={styles.title}
                type="Heading"
                color={theme.lightGrey}>
                {viewType === 'view' ? 'Steam Profile' : 'Confirm Profile'}
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
            <Condition condition={!!profile.profileImg}>
              <Image
                style={styles.imageContainer}
                source={{ uri: profile.profileImg }}
              />
            </Condition>
            <Spacing />
            <StyledText type="Heading">{profile.username}</StyledText>
            <Spacing />
            <Condition condition={!!profile.username && !!profile.country}>
              <StyledText type="ListItemSubTitleBold">{`${profile.username} - ${profile.country}`}</StyledText>
            </Condition>
            <Spacing />
            <StyledText type="ListItemSubTitleBold">{`Level: ${profile.level}`}</StyledText>
            <Spacing height={42} />
            {viewType === 'add' ? (
              <Button
                style={styles.confirmButton}
                title={'Confirm'}
                onPress={(): void => {
                  actions.updateUserData({
                    ...viewModel.user,
                    steamId: profile.steamId,
                  });
                  onClose();
                  navigation.goBack();
                }}
              />
            ) : (
              <Button
                style={styles.confirmButton}
                title={'Unlink Account'}
                color={theme.error}
                onPress={(): void => {
                  Alert.alert(t('common:alerts.unlinkAccount'), '', [
                    {
                      text: 'Unlink',
                      onPress: () => {
                        actions.updateUserData({
                          ...viewModel.user,
                          steamId: '',
                        });
                      },
                    },
                    {
                      text: t('common:alerts.cta.cancel'),
                      style: 'cancel',
                    },
                  ]);
                }}
              />
            )}
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
    top: isSmallScreen ? 64 : 108,
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
    alignItems: 'center',
  },
  title: {
    paddingRight: 16,
    paddingLeft: 16,
  },
  iconButton: {
    position: 'absolute',
    right: 16,
  },
  confirmButton: {
    marginTop: 16,
  },
});
