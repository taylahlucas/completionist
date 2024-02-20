import React, { useState } from 'react';
import { View } from 'react-native';
import Dropdown from '@components/general/Dropdown/Dropdown.native';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';
import useGetGameImage from './hooks/useGetGameImage.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import GameListItem from './GameListItem.native';
import { ScreenEnum, SubscriptionTypeEnum } from '@utils/CustomEnums';
import { SubscriptionData } from '@utils/CustomInterfaces';
import GameListSectionHeader from './GameListSectionHeader.native';
import useTranslateGameContent from '@utils/hooks/useTranslateGameContent.native';
import useContentDispatch from '../ContentList/hooks/useContentDispatch';
import useGetTheme from '@styles/hooks/useGetTheme';
import useMainState from '@redux/hooks/useMainState';

interface GameListSectionDropdown {
	testID?: string;
  title: string;
  data: SubscriptionData[];
}

const GameListSectionDropdown = ({ testID, title, data }: GameListSectionDropdown) => {
	const theme = useGetTheme();
  const navigation = useReactNavigation();
  const { setSelectedGame, setSelectedGameSettings, reset } = useMainDispatch();
	const { user } = useMainState();
  const { reset: contentReset } = useContentDispatch();
  const { getGameImage } = useGetGameImage();
  const { translateGameName } = useTranslateGameContent();
  const [isOpen, setIsOpen] = useState(true);
	
  return (
    <Dropdown
			testID={testID}
      header={<GameListSectionHeader isOpen={isOpen} title={title} />}
      isOpen={isOpen}
      setOpen={() => setIsOpen(!isOpen)}
    >
      <View style={{ flexDirection: 'row' }}>
        {data.map((game, index) => (
          <GameListItem
            key={index}
						testID={game.id}
            title={translateGameName(game.id)}
            enabled={game.isActive || user.subscription.tier !== SubscriptionTypeEnum.BRONZE}
						enabledColor={game.isActive ? theme.lightGrey : theme.midGrey}
            imageUrl={getGameImage(game.id)}
            onPress={(): void => {
							contentReset();
							reset();
							setSelectedGame(game.id);
							setSelectedGameSettings(game.id);
							navigation.navigate(ScreenEnum.Quests);
							// if (game.isActive) {
							// 	contentReset();
							// 	reset();
							// 	setSelectedGame(game.id);
							// 	setSelectedGameSettings(game.id);
							// 	navigation.navigate(ScreenEnum.Quests);
							// }
							// else {
								
							// }
            }}
          />
        ))}
      </View>
    </Dropdown>
  );
};

export default GameListSectionDropdown;