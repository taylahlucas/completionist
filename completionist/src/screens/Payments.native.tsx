import React from 'react';
import { useTranslation } from 'react-i18next';
import { StripeProvider } from '@stripe/stripe-react-native';
import PaymentsContent from '@components/custom/PaymentsContent/PaymentsContent.native';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import { DrawerScreenEnum } from '@utils/CustomEnums';
import config from '@utils/configs/config';

const Payments = () => {
  const { t } = useTranslation();

  return (
    <StripeProvider publishableKey={config.stripeTestToken} merchantIdentifier="merchant.identifier">
      <StandardLayout>
        <NavigationHeader
          id={DrawerScreenEnum.Payments}
          title={t('common:screens.payments')}
          leftAction={'back'}
        />
        <PaymentsContent />
      </StandardLayout>
    </StripeProvider>
  );
};

export default Payments;
