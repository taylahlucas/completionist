import React from 'react';
import { View } from 'react-native';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import StyledText from '@components/general/Text/StyledText.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import useGetGameImage from './hooks/useGetGameImage.native';
import useMainState from '@redux/hooks/useMainState';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import GameListItem from './GameListItem.native';
import { ScreenEnum } from '@utils/CustomEnums';
import { Subscription } from '@utils/CustomInterfaces';

interface GameListSectionDropdown {
  title: string;
  data: Subscription[]
}

const GameListSectionDropdown = ({ title, data }: GameListSectionDropdown) => {
  const navigation = useReactNavigation();
  const { setSelectedGame, setSelectedGameSettings, reset } = useMainDispatch();
  const { getGameImage } = useGetGameImage();
  
  return (
    <Dropdown
      header={<StyledText type={'ListItemSubTitleBold'}>{title}</StyledText>}
      isOpen={true}
      setOpen={() => { }}
    >
      <View style={{ flexDirection: 'row' }}>
        {data.map((game, index) => (
          <GameListItem
            key={index}
            title={game.id}
            enabled={game.isActive}
            imageUrl={getGameImage(game.id)}
            onPress={(): void => {
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