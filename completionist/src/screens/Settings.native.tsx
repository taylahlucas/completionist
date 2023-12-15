import SettingsContent from '@components/custom/SettingsContent/SettingsContent.native';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';

const Settings = () => {
  // Scroll View
  // Collection Settings
  // --- Each game should have toggles to switch objectives on or not (i.e. if they don't want to track locations and so disabling this will prevent it from being added to the total completion score.)
  // TODO: Work out primary and secondary collectable types.
  return (
    <StandardLayout>
      <NavigationHeader title={'Settings'} />
      <SettingsContent />
    </StandardLayout>
  );
};

export default Settings;