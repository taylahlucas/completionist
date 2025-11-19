import React from 'react';
import { useTranslation } from 'react-i18next';
import { StandardLayout } from '@components/general';
import { NavigationHeader } from '@navigation/index';
import { ContentSectionEnum, DrawerScreenEnum } from '@utils/index';
import { GameContent } from '@features/game-content/game-content';

export const Locations = () => {
  const { t } = useTranslation();

  return (
    <StandardLayout>
      <NavigationHeader
        id={DrawerScreenEnum.Locations}
        title={t('common:screens.locations')}
      />
      <GameContent section={ContentSectionEnum.LOCATIONS} />
    </StandardLayout>
  );
};
