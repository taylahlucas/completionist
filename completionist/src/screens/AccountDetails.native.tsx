import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import AccountDetailsContent from '@components/custom/AccountDetailsContent/AccountDetailsContent.native';

const AccountDetails = () => {  
	// TODO: Translations
  return (
    <StandardLayout>
      <NavigationHeader title={'Account Details'} leftAction='back' />
			<AccountDetailsContent />
    </StandardLayout>
  );
};

export default AccountDetails;