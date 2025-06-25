import React from 'react';
import { useTranslation } from 'react-i18next';
import { useReactNavigation } from '@navigation/hooks';
import { useMainState } from '@redux/hooks';
import StyledText from '@components/general/Text/StyledText.native';
import Button from '@components/general/button/button';
import { AuthScreenEnum, DrawerScreenEnum } from '@utils/custom-enums';
import { SettingsEmail } from './settings-styled-components';
import useGetTheme from '@styles/hooks/use-get-theme';

export const SettingsAccountDetails = () => {
  const navigation = useReactNavigation();
  const theme = useGetTheme();
  const { t } = useTranslation();
  const { user, selectedGame } = useMainState();
  const isGlobalSettings = !selectedGame;

  return (
    <>
      {/* <Condition condition={!!user.userAvatar}>
				<SettingsAvatarContainer
					source={{ uri: user.userAvatar }}
				/>
			</Condition> */}
      <StyledText type="ListItemTitleBold">{user.username}</StyledText>
      <SettingsEmail type="ListItemTitleBold">{user.email}</SettingsEmail>
      <Button
        type="navigation"
        color={theme.primaryPurple}
        title={t('common:settings.changeAccountDetails')}
        onPress={(): void =>
          navigation.navigate(
            isGlobalSettings
              ? AuthScreenEnum.GlobalAccountDetails
              : DrawerScreenEnum.AccountDetails,
          )
        }
      />
    </>
  );
};
