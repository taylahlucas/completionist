import React from 'react';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import AccountDetailsContent from '@components/custom/AccountDetailsContent/AccountDetailsContent.native';

const AccountDetails = () => {
	const { t } = useTranslation();

  return (
    <StandardLayout>
      <NavigationHeader title={t('common:screens.accountDetails')} leftAction='back' />
			<AccountDetailsContent />
    </StandardLayout>
  );
};

export default AccountDetails;