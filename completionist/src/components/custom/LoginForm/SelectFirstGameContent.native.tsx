import React, { useState } from 'react';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import Spacing from '@components/general/Spacing.native';
import StyledText from '@components/general/Text/StyledText.native';
import { Pressable, View } from 'react-native';
import GameListItem from '../GameList/GameListItem.native';
import useFilterGameList from '../GameList/hooks/useFilterGameList.native';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useMainState from '@redux/hooks/useMainState';
import useFormatter from '@utils/hooks/useFormatter';
import { SubscriptionData } from '@utils/CustomInterfaces';
import useTranslateGameContent from '@utils/hooks/useTranslateGameContent.native';
import useGetGameImage from '../GameList/hooks/useGetGameImage.native';
import useGetTheme from '@styles/hooks/useGetTheme';
import { SelectFirstGameContentContainer } from './LoginFormStyledComponents.native';

interface SelectFirstGameContentProps {
	searchValue: string;
	selectedGame?: SubscriptionData;
	setSelectedGame: (game: SubscriptionData) => void;
}

const SelectFirstGameContent = ({ searchValue, selectedGame, setSelectedGame }: SelectFirstGameContentProps) => {
	const theme = useGetTheme();
	const { user } = useMainState();
	const { filterGameList } = useFilterGameList();
	const { getFormattedSearchString } = useFormatter();
	const { translateGameName } = useTranslateGameContent();
	const { getGameImage } = useGetGameImage();

	return (
		<>
			<ScrollableList>
				<StyledText>With a Free account, you can select one game per month to track.</StyledText>
				<Spacing />
				<StyledText>Select your first game below!</StyledText>
				<Spacing />
				<StyledText type={'ListItemSubTitleItalic'}>(Don't worry if you make a mistake, you'll be able to change this once per month)</StyledText>
				<SelectFirstGameContentContainer>
					{filterGameList(user.subscription.data, false, getFormattedSearchString(searchValue)).map((game, index) => (
						<Pressable key={index} onPress={(): void => setSelectedGame(game)}>
							<GameListItem
								testID={game.id}
								title={translateGameName(game.id)}
								enabled={selectedGame?.id === game.id ?? false}
								enabledColor={selectedGame?.id === game.id ? theme.lightPurple : theme.midGrey}
								imageUrl={getGameImage(game.id)}
								onPress={(): void => { }}
							/>
						</Pressable>
					))}
				</SelectFirstGameContentContainer>
			</ScrollableList>
		</>
	);
};

export default SelectFirstGameContent;