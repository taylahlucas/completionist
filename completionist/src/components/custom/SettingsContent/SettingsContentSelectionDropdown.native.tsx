import React from 'react';
import { useTranslation } from 'react-i18next';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import DropdownSelection from '@components/general/Dropdown/DropdownSelection.native';
import DropdownSelectionContent from '@components/general/Dropdown/DropdownSelectionContent.native';
import useMainState from '@redux/hooks/useMainState';
import { games } from '@utils/constants';
import useSettingsDispatch from './hooks/useSettingsDispatch';
import useSettingsState from './hooks/useSettingsState';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useTranslateGameContent from '@utils/hooks/useTranslateGameContent.native';

const SettingsContentSelectionDropdown = () => {
  const { t } = useTranslation();
  const { setSelectedGameSettings } = useMainDispatch();
  const { selectedGameSettings } = useMainState();
  const { triggerSelectionOpen } = useSettingsDispatch();
  const { isSelectionOpen } = useSettingsState();
  const { translateGameName } = useTranslateGameContent();

  return (
    <Dropdown
      isOpen={isSelectionOpen}
      setOpen={() => null}
      header={
        <DropdownSelection
          title={translateGameName(selectedGameSettings)}
          isSelected={isSelectionOpen}
          onPress={(): void => triggerSelectionOpen(!isSelectionOpen)}
        />
      }
    >
      <DropdownSelectionContent
        content={games.map(game => ({
          id: game,
          title: t(`categories:${game}.title`)
        }))}
        onPress={(value): void => {
          triggerSelectionOpen(false);
          setSelectedGameSettings(value);
        }}
      />
    </Dropdown>
  );
};

export default SettingsContentSelectionDropdown;