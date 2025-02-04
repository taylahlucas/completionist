import React from 'react';
import { useTranslation } from 'react-i18next';
import { StripeProvider } from '@stripe/stripe-react-native';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import StyledText from '@components/general/Text/StyledText.native';
import TextInput from '@components/general/TextInput/TextInput.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import { AuthScreenEnum } from '@utils/CustomEnums';
import { KeyboardAvoidingScrollView } from '@components/general/Lists/index';
import Button from '@components/general/Button/Button.native';
import GameListItem from '@components/custom/GameList/GameListItem.native';
import usePurchaseGame from './hooks/usePurchaseGame';
import { Spacing } from '@components/general/index';
import { View } from 'react-native';
import useGetTheme from '@styles/hooks/useGetTheme';
import config from '@utils/configs/config';

const PurchaseGame = (params: any) => {
  const { t } = useTranslation();
  const theme = useGetTheme();
  const gameId = params.route?.params.gameId;
  const { viewModel, actions } = usePurchaseGame(gameId);

  // TODO: Add translations, add styles to style file
  return (
    <StripeProvider
      publishableKey={config.stripeTestToken}
      merchantIdentifier="merchant.identifier">
      <StandardLayout>
        <NavigationHeader
          id={AuthScreenEnum.PurchaseGame}
          title={t('common:screens.purchaseGame')}
          leftAction="back"
        />
        <KeyboardAvoidingScrollView
          awareView={
            <Button
              title={t('common:continue')}
              onPress={actions.handlePayment}
            />
          }>
          <GameListItem
            game={viewModel.selectedGame}
            enabled={true}
            onPress={(): void => {}}
          />
          <View style={{ width: 300, alignItems: 'flex-start', padding: 16 }}>
            <StyledText align="left">{`Quests:  ${viewModel.questsLength}`}</StyledText>
            <StyledText align="left">{`Collectables:  ${viewModel.collectablesLength}`}</StyledText>
            <StyledText align="left">{`Locations:  ${viewModel.locationsLength}`}</StyledText>
            <StyledText align="left">{`Miscellaneous Items:  ${viewModel.miscLength}`}</StyledText>
          </View>

          <StyledText type="ListItemSubTitleBold" color={theme.lightGrey}>
            {`Points available: ${viewModel.pointsAvailable}`}
          </StyledText>
          <View
            style={{
              width: 100,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <StyledText>{`Use points:`}</StyledText>
            {/* // TODO: Numeric input */}
            <TextInput
              width={160}
              inputStyle="text"
              placeholder=""
              keyboardType="numeric"
              onChangeText={(value): void => {
                try {
                  const numericValue = Number.parseInt(value);
                  if (numericValue <= viewModel.initialPointsAvailable) {
                    actions.setPoints(numericValue.toString());
                    actions.setPointsAvailable(
                      viewModel.initialPointsAvailable - numericValue,
                    );
                  } else if (numericValue > viewModel.initialPointsAvailable) {
                    actions.setPoints(
                      viewModel.initialPointsAvailable.toString(),
                    );
                    actions.setPointsAvailable(0);
                  } else {
                    actions.setPoints('');
                    actions.setPointsAvailable(2000);
                  }
                } catch {
                  // TODO: do something here?
                }
              }}
              value={viewModel.points}
              onReset={() => actions.setPoints('0')}
            />
          </View>

          <StyledText type="ListItemSubTitle" color={theme.lightGrey}>
            {`Access tracking for ${actions.translateGameName(gameId)} for`}
          </StyledText>
          <Spacing height={8} />
          <StyledText
            type="ListItemTitleBold"
            color={theme.lightGrey}>{`3.99 ?`}</StyledText>
          <Spacing height={8} />
          <StyledText>{`This is a one-off payment.\n`}</StyledText>
        </KeyboardAvoidingScrollView>
      </StandardLayout>
    </StripeProvider>
  );
};

export default PurchaseGame;
