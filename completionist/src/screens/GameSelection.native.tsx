import React, { useState } from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import GameList from '@components/custom/GameList/GameList.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import useMainState from '@redux/hooks/useMainState';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import { useTranslation } from 'react-i18next';
import StyledText from '@components/general/Text/StyledText.native';
import Icon from '@components/general/Icon/Icon.native';
import { IconTypeEnum, SubscriptionTypeEnum } from '@utils/CustomEnums';
import useGetTheme from '@styles/hooks/useGetTheme';
import { GameSelectionChangeLeftContainer } from '@components/custom/GameList/GameListItemStyledComponents.native';
import Condition from '@components/general/Condition.native';
import GameChangesLeft from '@components/custom/GameList/GameChangesLeft.native';

const GameSelection = () => {
	const { t } = useTranslation();
	const theme = useGetTheme();
	const { user } = useMainState();
	const [searchValue, setSearchValue] = useState('');

	return (
		<StandardLayout>
			<NavigationHeader
				title={`${t('common:welcome')}\n${user.name}`}
				leftAction='subscriptions'
				rightAction='logout'
			/>
			<CustomSearchBar
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				onReset={(): void => setSearchValue('')}
			/>
			<GameChangesLeft />
			<GameList searchValue={searchValue.toLocaleLowerCase()} />
		</StandardLayout>
	);
};

export default GameSelection;