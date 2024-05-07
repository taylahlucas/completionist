import React, { useState } from 'react';
import { View, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import GameList from '@components/custom/GameList/GameList.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import useMainState from '@redux/hooks/useMainState';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import Condition from '@components/general/Condition.native';
import { IconTypeEnum, SubscriptionTypeEnum } from '@utils/CustomEnums';
import StyledText from '@components/general/Text/StyledText.native';
import Icon from '@components/general/Icon/Icon.native';
import { GameSelectionChangeLeftContainer } from '@components/custom/GameList/GameListItemStyledComponents.native';
import useGetTheme from '@styles/hooks/useGetTheme';

const GameSelection = () => {
	const theme = useGetTheme();
	const { t } = useTranslation();
	const { user } = useMainState();
	const [searchValue, setSearchValue] = useState('');

	// const { getSteamUser } = useEndpoints();

	const renderSubscriptionComponent = (style: ViewStyle) => {
		return (
			<StyledText
				style={style}
				type='ListItemSubDescription'
				align='right'
			>
				{user.subscription.tier.toLocaleUpperCase()}
			</StyledText>
		);
	};

	// TODO: Test UI for paid subscription
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
			<Condition
				condition={user.subscription.tier === SubscriptionTypeEnum.FREE}
				conditionalElement={renderSubscriptionComponent({ marginRight: 34 })}
			>
				<GameSelectionChangeLeftContainer>
					<View style={{ flexDirection: 'row' }}>
						<Icon
							name='arrow-u-right-top'
							type={IconTypeEnum.MaterialCommunityIcons}
							size={20}
							color={theme.lightGrey}
						/>
						<StyledText
							style={{ marginLeft: 8 }}
							type='ListItemSubDescription'
							align='left'
						>
							{`${t('common:changesLeft')}${user.subscription.changesLeft}`}
						</StyledText>
					</View>
					{renderSubscriptionComponent({ position: 'absolute', right: 34 })}
				</GameSelectionChangeLeftContainer>
			</Condition>
			<GameList searchValue={searchValue.toLocaleLowerCase()} />
		</StandardLayout>
	);
};

export default GameSelection;