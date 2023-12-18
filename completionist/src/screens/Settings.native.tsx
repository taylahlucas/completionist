import SettingsContent from '@components/custom/SettingsContent/SettingsContent.native';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';

const Settings = () => {
  return (
    <StandardLayout>
      <NavigationHeader title={'Settings'} />
      <SettingsContent />
    </StandardLayout>
  );
};

export default Settings;