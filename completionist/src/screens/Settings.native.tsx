import { useTranslation } from 'react-i18next';
import SettingsContent from '@components/custom/SettingsContent/SettingsContent.native';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';

const Settings = () => {
  const { t } = useTranslation();
  
  return (
    <StandardLayout>
      <NavigationHeader title={t('common:screens.settings')} />
      <SettingsContent />
    </StandardLayout>
  );
};

export default Settings;