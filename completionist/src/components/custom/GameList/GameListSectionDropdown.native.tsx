import React, { useState } from 'react';
import { View } from 'react-native';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import GameListItem from './GameListItem.native';
import { SubscriptionData } from '@utils/CustomInterfaces';
import GameListSectionHeader from './GameListSectionHeader.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import useHandleGameSelection from './hooks/useHandleGameSelection.native';

interface GameListSectionDropdown {
	testID?: string;
  title: string;
  data: SubscriptionData[];
}

const GameListSectionDropdown = ({ testID, title, data }: GameListSectionDropdown) => {
	const theme = useGetTheme();
  const [isOpen, setIsOpen] = useState(true);
	const { handleGameSelection }  = useHandleGameSelection();

  return (
    <Dropdown
			testID={testID}
      header={<GameListSectionHeader isOpen={isOpen} title={title} />}
      isOpen={isOpen}
      setOpen={() => setIsOpen(!isOpen)}
    >
      <View style={{ flexDirection: 'row', marginTop: 8, flexWrap: 'wrap' }}>
        {data.map((game: SubscriptionData, index: number) => (
          <GameListItem
            key={index}
						game={game}
            enabled={game.isActive}
						enabledColor={game.isActive ? theme.lightGrey : theme.midGrey}
            onPress={(): void => handleGameSelection(game)}
          />
        ))}
      </View>
    </Dropdown>
  );
};

export default GameListSectionDropdown;