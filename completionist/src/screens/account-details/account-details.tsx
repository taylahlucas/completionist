import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StandardLayout } from '@components/general';
import { NavigationHeader } from '@navigation/index';
import { DrawerScreenEnum } from '@utils/index';
import { AccountDetailsContent } from '@features/settings';

export const AccountDetails = () => {
  const { t } = useTranslation();
  const [isForm, setIsForm] = useState<boolean>(false);

  return (
    <StandardLayout>
      <NavigationHeader
        id={DrawerScreenEnum.AccountDetails}
        title={t('common:screens.accountDetails')}
        isForm={isForm}
        leftAction="back"
      />
      <AccountDetailsContent setIsForm={setIsForm} />
    </StandardLayout>
  );
};
