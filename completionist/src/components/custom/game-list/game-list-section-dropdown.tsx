import React from 'react';
import { Dropdown } from '@components/general/dropdown';
import { GameData } from '@utils/custom-interfaces';
import {
  GameListSectionHeader,
  GameListItem,
  GameListDropdownContainer,
} from './';
import useGetTheme from '@styles/hooks/use-get-theme';
import { useGameListSelectionDropdown } from './hooks';
import { GameListSelectionType } from '@utils/custom-types';

interface GameListSectionDropdown {
  testID?: string;
  type: GameListSelectionType;
  title: string;
  data: GameData[];
}

export const GameListSectionDropdown = ({
  testID,
  type,
  title,
  data,
}: GameListSectionDropdown) => {
  const theme = useGetTheme();
  const { viewModel, actions } = useGameListSelectionDropdown();

  return (
    <Dropdown
      testID={testID}
      header={<GameListSectionHeader isOpen={viewModel.isOpen} title={title} />}
      isOpen={viewModel.isOpen}
      setOpen={() => actions.setIsOpen(!viewModel.isOpen)}>
      <GameListDropdownContainer>
        {data.map((game: GameData, index: number) => (
          <GameListItem
            key={index}
            game={game}
            enabled={type === 'active'}
            enabledColor={type === 'active' ? theme.lightGrey : theme.midGrey}
            onPress={(): void => actions.handleGameSelection(game, type)}
          />
        ))}
      </GameListDropdownContainer>
    </Dropdown>
  );
};
