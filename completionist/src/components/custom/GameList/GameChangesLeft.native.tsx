import useMainState from '@redux/hooks/useMainState';
import React from 'react';
import { GameSelectionChangeLeftContainer } from './GameListItemStyledComponents.native';
import Condition from '@components/general/Condition.native';
import { IconTypeEnum, SubscriptionTypeEnum } from '@utils/CustomEnums';
import useGetTheme from '@styles/hooks/useGetTheme';
import StyledText from '@components/general/Text/StyledText.native';
import Icon from '@components/general/Icon/Icon.native';
import { ViewStyle } from 'react-native';

const GameChangesLeft = () => {
	const theme = useGetTheme();
	const { user } = useMainState();

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

	return (
		<Condition
			condition={user.subscription.tier === SubscriptionTypeEnum.FREE}
			conditionalElement={renderSubscriptionComponent({ marginRight: 34 })}
		>
			<GameSelectionChangeLeftContainer>
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
					{/* // TODO: Add to translations */}
					{`CHANGES LEFT: ${user.subscription.changesLeft}`}
				</StyledText>
				{renderSubscriptionComponent({ position: 'absolute', right: 34 })}
			</GameSelectionChangeLeftContainer>
		</Condition>
	);
};

export default GameChangesLeft;