import React from 'react';
import { NavigationHeader } from '@navigation/index';
import { useTranslation } from 'react-i18next';
import { StandardLayout } from '@components/general';
import { UnauthorizedScreenEnum } from '@utils/index';
import { SelectFirstGameContent } from '@features/signup';
import { useIsRequestLoading } from '@data/api/hooks';

export const SelectFirstGame = () => {
  const { t } = useTranslation();
  const isRequestLoading = useIsRequestLoading();

  return (
    <StandardLayout isLoading={isRequestLoading}>
      <NavigationHeader
        id={UnauthorizedScreenEnum.SelectFirstGame}
        title={t('common:screens.selectGame')}
        // leftAction={viewModel.isGoogleSignIn ? 'back' : 'none'}
      />
      <SelectFirstGameContent />
    </StandardLayout>
  );
};
