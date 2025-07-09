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
import { filterGameList } from '../../../components/custom/game-list/hooks/use-filter-game-list';
import { useMainState, useMainDispatch } from '@redux/hooks';

export const SettingsGameCollections = () => {
  const { t } = useTranslation();
  const { user, selectedGameSettings } = useMainState();
  const { setSelectedGameDataSettings } = useMainDispatch();
  const { userSettingsMainConfig } = useGetUserGameData();

  const { translateGameName } = useTranslateGameContent();
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
          content={filterGameList(user.gameData, true, '', t).map(game => ({
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
