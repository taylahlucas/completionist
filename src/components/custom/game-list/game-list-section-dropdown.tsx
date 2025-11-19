import React, { useState } from 'react';
import { Dropdown } from '@components/general';
import { GameData, GameListSelectionType } from '@utils/index';
import {
  GameListSectionHeader,
  GameListItem,
  GameListDropdownContainer,
} from './';
import { useGameListSelectionDropdown } from './hooks';
import useGetTheme from '@styles/hooks/use-get-theme';

interface GameListSectionDropdownProps {
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
}: GameListSectionDropdownProps) => {
  const theme = useGetTheme();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const { handleGameSelection } = useGameListSelectionDropdown();

  return (
    <Dropdown
      testID={testID}
      header={<GameListSectionHeader isOpen={isOpen} title={title} />}
      isOpen={isOpen}
      setOpen={() => setIsOpen(!isOpen)}>
      <GameListDropdownContainer>
        {data.map((game: GameData, index: number) => (
          <GameListItem
            key={index}
            game={game}
            enabled={type === 'active'}
            enabledColor={type === 'active' ? theme.lightGrey : theme.midGrey}
            onPress={(): void => handleGameSelection(game, type)}
          />
        ))}
      </GameListDropdownContainer>
    </Dropdown>
  );
};
