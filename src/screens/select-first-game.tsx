import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavigationHeader } from '@navigation/index';
import { StandardLayout } from '@components/general';
import { UnAuthorizedScreenEnum } from '@utils/index';
import { SelectFirstGameContent } from '@features/signup';
import { useIsRequestLoading } from '@api/';

export const SelectFirstGame = () => {
  const { t } = useTranslation();
  const isRequestLoading = useIsRequestLoading();
  const isGoogleSignIn = true;

  return (
    <StandardLayout isLoading={isRequestLoading}>
      <NavigationHeader
        id={UnAuthorizedScreenEnum.SelectFirstGame}
        title={t('common:screens.selectGame')}
        // TODO: TODO: Fix viewModel.isGoogleSignIn
        leftAction={isGoogleSignIn ? 'back' : 'none'}
      />
      <SelectFirstGameContent />
    </StandardLayout>
  );
};
