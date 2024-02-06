import React, { useState } from 'react';
import { View } from 'react-native';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import useGetGameImage from './hooks/useGetGameImage.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import GameListItem from './GameListItem.native';
import { ScreenEnum } from '@utils/CustomEnums';
import { Subscription, SubscriptionData } from '@utils/CustomInterfaces';
import GameListSectionHeader from './GameListSectionHeader.native';
import useTranslateGameContent from '@utils/hooks/useTranslateGameContent.native';
import useContentDispatch from '../ContentList/hooks/useContentDispatch';

interface GameListSectionDropdown {
  title: string;
  data: SubscriptionData[];
}

const GameListSectionDropdown = ({ title, data }: GameListSectionDropdown) => {
  const navigation = useReactNavigation();
  const { setSelectedGame, setSelectedGameSettings, reset } = useMainDispatch();
  const { reset: contentReset } = useContentDispatch();
  const { getGameImage } = useGetGameImage();
  const { translateGameName } = useTranslateGameContent();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Dropdown
      header={<GameListSectionHeader isOpen={isOpen} title={title} />}
      isOpen={isOpen}
      setOpen={() => setIsOpen(!isOpen)}
    >
      <View style={{ flexDirection: 'row' }}>
        {data.map((game, index) => (
          <GameListItem
            key={index}
            title={translateGameName(game.id)}
            enabled={game.isActive}
            imageUrl={getGameImage(game.id)}
            onPress={(): void => {
              contentReset();
              reset();
              setSelectedGame(game.id);
              setSelectedGameSettings(game.id);
              navigation.navigate(ScreenEnum.Quests);
            }}
          />
        ))}
      </View>
    </Dropdown>
  );
};

export default GameListSectionDropdown;