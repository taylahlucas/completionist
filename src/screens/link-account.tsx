import React from 'react';
// import { useTranslation } from 'react-i18next';
import { StandardLayout } from '@components/general';
import { NavigationHeader } from '@navigation/index';
import { UnAuthorizedScreenEnum } from '@utils/index';
import { LinkAccountContent } from '@features/signup';

export const LinkAccount = () => {
  // const { t } = useTranslation()

  // TODO: Add to translations
  return (
    <StandardLayout>
      <NavigationHeader
        id={UnAuthorizedScreenEnum.LinkAccount}
        title={'Link Your Accounts'}
        leftAction="back"
      />
      <LinkAccountContent />
    </StandardLayout>
  );
};
