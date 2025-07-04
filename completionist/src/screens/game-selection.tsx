import React from 'react';
import { useTranslation } from 'react-i18next';
import { StandardLayout } from '@components/general';
import { NavigationHeader } from '@navigation/index';
import { useMainState } from '@redux/hooks';
import { AuthScreenEnum } from '@utils/index';
import { GameSelectionContent } from '@features/game-selection';

export const GameSelection = () => {
  const { t } = useTranslation();
  const { user } = useMainState();

  return (
    <StandardLayout>
      <NavigationHeader
        id={AuthScreenEnum.GameSelection}
        title={`${t('common:welcome')}\n${user.username}`}
        leftAction="achievements"
        rightAction="settings"
      />
      <GameSelectionContent />
    </StandardLayout>
  );
};
