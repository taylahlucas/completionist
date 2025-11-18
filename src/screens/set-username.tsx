import React from 'react';
import { useTranslation } from 'react-i18next';
import { StandardLayout } from '@components/general';
import { NavigationHeader } from '@navigation/index';
import { UnAuthorizedScreenEnum } from '@utils/index';
import { SetUsernameContent } from '@features/signup';

export const SetUsername = () => {
  const { t } = useTranslation();

  return (
    <StandardLayout>
      <NavigationHeader
        id={UnAuthorizedScreenEnum.SetUsername}
        title={t('common:setUsername.title')}
        leftAction="back"
      />
      <SetUsernameContent />
    </StandardLayout>
  );
};
