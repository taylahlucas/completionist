import React, { useEffect, useRef, useState } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { useReactNavigation } from '@navigation/hooks';
import { useAchievements } from '@screens/achievements/hooks';
import useGetTheme from '@styles/hooks/use-get-theme';
import { useTranslation } from 'react-i18next';
import { Alert, Image, Pressable, StyleSheet, View } from 'react-native';
import {
  Button,
  Condition,
  IconButton,
  Spacing,
  StyledText,
} from '@components/general';
import { IconTypeEnum } from '@utils/custom-enums';
import { DEFAULT_BORDER_RADIUS, isSmallScreen } from '@styles/global';
import { Sheet } from '@navigation/index';

type ProfileViewType = 'add' | 'view';

// TODO: Not showing :()
export const SteamProfileSheet = () => {
  const [viewType, setViewType] = useState<ProfileViewType>('view');
  const onClose = () => {};
  const profile = {
    steamId: '123',
    username: 'Username',
    name: 'Name',
    country: 'aus',
    level: 2,
    profileImg: null,
  };
  const { t } = useTranslation();
  const theme = useGetTheme();
  const navigation = useReactNavigation();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { viewModel, actions } = useAchievements();

  // useEffect(() => {
  //   bottomSheetRef.current?.expand();
  // }, []);

  return (
    <Sheet>
      <View style={{ height: 100, backgroundColor: 'white' }} />
    </Sheet>
  );
};

const styles = StyleSheet.create({
  // modalContainer: {
  //   padding: 20,
  //   borderRadius: 20,
  //   height: 480,
  //   top: isSmallScreen ? 64 : 108,
  // },
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

{
  /* <View style={styles.contentContainer}>
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
              source={{ uri: profile.profileImg ?? '' }}
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
        </View> */
}
