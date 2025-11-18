import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavigationHeader } from '@navigation/index';
import { StandardLayout } from '@components/general';
import { UnAuthorizedScreenEnum } from '@utils/index';
import { SelectFirstGameContent } from '@features/signup';
import { useIsRequestLoading } from '@data/api/hooks';

export const SelectFirstGame = () => {
  const { t } = useTranslation();
  const isRequestLoading = useIsRequestLoading();

  return (
    <StandardLayout isLoading={isRequestLoading}>
      <NavigationHeader
        id={UnAuthorizedScreenEnum.SelectFirstGame}
        title={t('common:screens.selectGame')}
        // TODO: viewModel.isGoogleSignIn
        leftAction={true ? 'back' : 'none'}
      />
      <SelectFirstGameContent />
    </StandardLayout>
  );
};
