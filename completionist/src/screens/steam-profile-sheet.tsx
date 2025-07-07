import React, { useEffect, useRef, useState } from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useReactNavigation } from '@navigation/hooks';

import useGetTheme from '@styles/hooks/use-get-theme';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Condition,
  IconButton,
  Loading,
  Spacing,
  StyledText,
} from '@components/general';
import { IconTypeEnum } from '@utils/custom-enums';
import { DEFAULT_BORDER_RADIUS } from '@styles/global';
import { Sheet } from '@navigation/index';
import { useAchievements } from '../features/achievements/hooks';
import { getSteamUserById } from '@data/api';
import { SteamProfile } from '@utils/custom-interfaces';

type ProfileViewType = 'add' | 'view';

export const SteamProfileSheet = (params: any) => {
  const steamId = params.route?.params.steamId;
  const viewType = params.route?.params.viewType as ProfileViewType;

  const { t } = useTranslation();
  const theme = useGetTheme();
  const navigation = useReactNavigation();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { viewModel, actions } = useAchievements();
  const [profile, setProfile] = useState<SteamProfile | null>();

  useEffect(() => {
    const getSteamUserProfile = async () => {
      const profile = await getSteamUserById(steamId);

      if (!profile) {
        Alert.alert('Could not get profile', 'Please try again', [
          {
            text: t('common:alerts.cta.ok'),
            // Update user with password
            onPress: (): void => navigation.goBack(),
          },
          {
            text: t('common:alerts.cta.cancel'),
          },
        ]);
      } else {
        setProfile(profile);
      }
    };

    void getSteamUserProfile();
  }, [steamId]);

  return (
    <Sheet ref={bottomSheetRef} backgroundColor={theme.black}>
      {!profile ? (
        <Loading />
      ) : (
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <StyledText
              style={styles.title}
              type="Heading"
              color={theme.lightGrey}>
              {/* // TODO: Add to translations */}
              {viewType === 'view' ? 'Steam Profile' : 'Confirm Profile'}
            </StyledText>
            <IconButton
              style={styles.iconButton}
              name={'arrow-down'}
              type={IconTypeEnum.Ionicons}
              color={theme.lightGrey}
              onPress={(): void => navigation.goBack()}
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
            <>
              {/* // TODO: Add to translations */}
              <Button
                title={'Confirm'}
                onPress={(): void => {
                  actions.updateUserData({
                    ...viewModel.user,
                    steamId: profile.steamId,
                  });
                  navigation.goBack();
                }}
              />
              <Spacing />
              <Button
                color={theme.error}
                title={'Cancel'}
                onPress={(): void => {
                  actions.updateUserData({
                    ...viewModel.user,
                    steamId: profile.steamId,
                  });
                  navigation.goBack();
                }}
              />
            </>
          ) : (
            <Button
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
      )}
    </Sheet>
  );
};

const styles = StyleSheet.create({
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
});
