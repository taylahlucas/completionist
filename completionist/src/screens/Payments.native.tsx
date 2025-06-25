import React from 'react';
import { useTranslation } from 'react-i18next';
import PaymentsContent from '@components/custom/payments-content/payments-content';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/navigation-header';
import { DrawerScreenEnum } from '@utils/CustomEnums';

const Payments = () => {
  const { t } = useTranslation();

  return (
    <StandardLayout>
      <NavigationHeader
        id={DrawerScreenEnum.Payments}
        title={t('common:screens.payments')}
        leftAction={'back'}
      />
      <PaymentsContent />
    </StandardLayout>
  );
};

export default Payments;
