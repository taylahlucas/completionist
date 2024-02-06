import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import SubscriptionContent from '@components/custom/SubscriptionContent/SubscriptionContent.native';

const Subscriptions = () => {
    const { t } = useTranslation();

    // TODO: Pop up from bottom
    return (
        <StandardLayout>
            <NavigationHeader title={t('common:screens.subscriptions')} leftAction='back' />
            <SubscriptionContent />
        </StandardLayout>
    )
};

export default Subscriptions;