import React from 'react';
import { useTranslation } from 'react-i18next';
import { StandardLayout } from '@components/general';
import { NavigationHeader } from '@navigation/index';
import { useMainState } from '@redux/hooks';
import { AuthScreenEnum } from '@utils/index';
import { View } from 'react-native';
import { useReactNavigation } from '@navigation/hooks';
// import { GameSelectionContent } from '@features/game-selection';

export const GameSelection = () => {
  const { t } = useTranslation();
  const { user } = useMainState();
  const navigation = useReactNavigation();

  return (
    <StandardLayout>
      <View />
      <NavigationHeader
        id={AuthScreenEnum.GameSelection}
        title={`${t('common:welcome')}\n${user.username}`}
        leftAction="achievements"
        rightAction="settings"
        rightCallback={(): void =>
          navigation.navigate(AuthScreenEnum.GlobalSettings)
        }
      />
      {/* <GameSelectionContent /> */}
    </StandardLayout>
  );
};
