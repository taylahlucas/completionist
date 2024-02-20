import React from 'react';
import { useTranslation } from 'react-i18next';
import PaymentsContent from '@components/custom/PaymentsContent/PaymentsContent.native';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';

const Payments = () => {
	const { t } = useTranslation();

	return (
		<StandardLayout>
			<NavigationHeader title={t('common:screens.payments')} leftAction={'back'} />
			<PaymentsContent />
		</StandardLayout>
	);
};

export default Payments;