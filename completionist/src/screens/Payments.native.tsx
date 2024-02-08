import PaymentsContent from '@components/custom/PaymentsContent/PaymentsContent.native';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';

const Payments = () => {
	return (
		<StandardLayout>
			<NavigationHeader title={'Payment'} leftAction={'back'} />
			<PaymentsContent />
		</StandardLayout>
	);
};

export default Payments;