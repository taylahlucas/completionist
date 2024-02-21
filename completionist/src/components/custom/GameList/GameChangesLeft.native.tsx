import React from 'react';
import { useTranslation } from 'react-i18next';
import useMainState from '@redux/hooks/useMainState';
import { GameSelectionChangeLeftContainer } from './GameListItemStyledComponents.native';
import Condition from '@components/general/Condition.native';
import { IconTypeEnum, SubscriptionTypeEnum } from '@utils/CustomEnums';
import useGetTheme from '@styles/hooks/useGetTheme';
import StyledText from '@components/general/Text/StyledText.native';
import Icon from '@components/general/Icon/Icon.native';
import { ViewStyle } from 'react-native';

const GameChangesLeft = () => {
	const theme = useGetTheme();
	const { t } = useTranslation();
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
					{`${t('common:changesLeft')}${user.subscription.changesLeft}`}
				</StyledText>
				{renderSubscriptionComponent({ position: 'absolute', right: 34 })}
			</GameSelectionChangeLeftContainer>
		</Condition>
	);
};

export default GameChangesLeft;