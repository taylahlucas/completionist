import React from 'react';
import { useTranslation } from 'react-i18next';
import { StandardLayout } from '@components/general';
import { NavigationHeader } from '@navigation/index';
import { ContentSectionEnum, DrawerScreenEnum } from '@utils/index';
import { GameContent } from '@features/game-content/game-content';

export const Miscellaneous = () => {
  const { t } = useTranslation();

  return (
    <StandardLayout>
      <NavigationHeader
        id={DrawerScreenEnum.Miscellaneous}
        title={t('common:screens.miscellaneous')}
      />
      <GameContent section={ContentSectionEnum.MISCELLANEOUS} />
    </StandardLayout>
  );
};
