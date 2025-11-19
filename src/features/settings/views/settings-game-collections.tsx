import React, { useState } from 'react';
import { Animated } from 'react-native';
import { useTranslation } from 'react-i18next';
import { IsActive, GameKeyEnum } from '@utils/index';
import { useGetUserGameData, useTranslateGameContent } from '@data/hooks';
import {
  SettingsItemDropdown,
  SettingsCollectionList,
  SettingsDescription,
} from './';
import {
  Dropdown,
  DropdownSelection,
  DropdownSelectionContent,
} from '@components/general';

import { useMainState, useMainDispatch } from '@redux/hooks';
import { useFilterGameList } from '@utils/hooks';
import { useAuthState } from '@redux/auth';

export const SettingsGameCollections = () => {
  const { t } = useTranslation();
  const { selectedGameSettings } = useMainState();
  const { user } = useAuthState();
  const { setSelectedGameDataSettings } = useMainDispatch();
  const { userSettingsMainConfig } = useGetUserGameData();
  const { translateGameName } = useTranslateGameContent();
  const { filterGameList } = useFilterGameList();
  const minHeight = userSettingsMainConfig.length > 3 ? 200 : 150;
  const height = new Animated.Value(minHeight);
  const [isSelectionOpen, triggerSelectionOpen] = useState(false);

  const toggleHeight = (expanded: boolean) => {
    const newHeight = expanded ? 300 : minHeight;
    Animated.timing(height, {
      toValue: newHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <>
      <SettingsDescription align="left">
        {t('common:settings.setCollections')}
      </SettingsDescription>
      <Dropdown
        isOpen={isSelectionOpen}
        setOpen={() => null}
        header={
          <DropdownSelection
            title={translateGameName(selectedGameSettings)}
            isSelected={isSelectionOpen}
            onPress={(): void => triggerSelectionOpen(!isSelectionOpen)}
          />
        }>
        <DropdownSelectionContent
          content={filterGameList(user.gameData, '').map(game => ({
            id: game.id,
            title: t(`common:categories.${game.id}.title`),
          }))}
          onPress={(value): void => {
            triggerSelectionOpen(false);
            setSelectedGameDataSettings(value as GameKeyEnum);
          }}
        />
      </Dropdown>

      <SettingsCollectionList style={{ height: height }}>
        {userSettingsMainConfig.map((item: IsActive, index: number) => (
          <SettingsItemDropdown
            key={index}
            item={item}
            triggerListOpen={toggleHeight}
          />
        ))}
      </SettingsCollectionList>
    </>
  );
};
