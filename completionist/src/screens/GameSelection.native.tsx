import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import GameList from '@components/custom/GameList/GameList.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import useMainState from '@redux/hooks/useMainState';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import { AuthScreenEnum } from '@utils/CustomEnums';

const GameSelection = () => {
  // const theme = useGetTheme();
  const { t } = useTranslation();
  const { user } = useMainState();
  const [searchValue, setSearchValue] = useState('');

  // const renderSubscriptionComponent = (style: ViewStyle) => {
  // 	return (
  // 		<StyledText
  // 			style={style}
  // 			type='ListItemSubDescription'
  // 			align='right'
  // 		>
  // 			{/* {user.subscription.tier.toLocaleUpperCase()} */}
  // 			Test
  // 		</StyledText>
  // 	);
  // };

  // TODO: Test UI for paid subscription
  return (
    <StandardLayout>
      <NavigationHeader
        id={AuthScreenEnum.GameSelection}
        title={`${t('common:welcome')}\n${user.username}`}
        leftAction="achievements"
        rightAction="settings"
      />
      <CustomSearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onReset={(): void => setSearchValue('')}
      />
      <GameList searchValue={searchValue.toLocaleLowerCase()} />
    </StandardLayout>
  );
};

export default GameSelection;

{
  /* <Condition
				condition={user.subscription.tier === SubscriptionTypeEnum.FREE}
				conditionalElement={renderSubscriptionComponent({ marginRight: 34 })}
			>
				<GameSelectionChangesLeftContainer>
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
				</GameSelectionChangesLeftContainer>
			</Condition> */
}
