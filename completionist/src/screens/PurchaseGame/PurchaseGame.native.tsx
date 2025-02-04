import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StripeProvider } from '@stripe/stripe-react-native';
import {
  initPaymentSheet,
  presentPaymentSheet,
} from '@stripe/stripe-react-native';

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
import { allGameData } from '@utils/configs/gameConfigs';
import { Alert, View } from 'react-native';
import useGetTheme from '@styles/hooks/useGetTheme';
import useMainState from '@redux/hooks/useMainState';
import useEndpoints from '@data/api/hooks/useEndpoints.native';
import config from '@utils/configs/config';

const PurchaseGame = (params: any) => {
  const { t } = useTranslation();
  const theme = useGetTheme();
  const gameId = params.route?.params.gameId;
  const { viewModel, actions } = usePurchaseGame(gameId);
  const selectedGame = allGameData.find(game => game.id === gameId);
  const { createPayment } = useEndpoints();
  const { user } = useMainState();
  const initialPointsAvailable = 2000;
  const [pointsAvailable, setPointsAvailable] = useState(
    initialPointsAvailable,
  );
  const [points, setPoints] = useState('');

  if (!selectedGame) {
    console.log('Could not find selected game');
    return;
  }

  const fetchPaymentIntent = async (): Promise<
    | {
        paymentIntent: any;
        ephemeralKey: any;
        customer: any;
      }
    | undefined
  > => {
    try {
      const response = await createPayment({
        userId: user.userId,
        amount: 399,
        game: selectedGame.id,
      });
      const { paymentIntent, ephemeralKey, customer } = response.data;

      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    } catch (error) {
      console.error('Error fetching payment intent:', error);
      return;
    }
  };

  const openPaymentSheet = async () => {
    console.log('Presenting payment sheet');
    const { error } = await presentPaymentSheet();

    console.log('HERE after');
    if (error) {
      Alert.alert('Payment failed', error.message);
    } else {
      Alert.alert('Success', 'Your payment was confirmed!');
    }
  };

  const handlePayment = async () => {
    const data = await fetchPaymentIntent();

    if (!data) {
      console.log('Could not get payment intent');
      return;
    }

    console.log('DATA: ', data);
    const { error } = await initPaymentSheet({
      merchantDisplayName: 'TTech Designs Ltd.',
      customerId: data.customer,
      customerEphemeralKeySecret: data.ephemeralKey,
      paymentIntentClientSecret: data.paymentIntent,
      allowsDelayedPaymentMethods: true,
      returnURL: 'completionist://stripe-redirect',
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
    });

    if (!error) {
      openPaymentSheet();
    } else {
      console.log('Error Handling Payment: ', error);
    }
  };

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
            <Button title={t('common:continue')} onPress={handlePayment} />
          }>
          <GameListItem
            game={selectedGame}
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
            {`Points available: ${pointsAvailable}`}
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
                  if (numericValue <= initialPointsAvailable) {
                    setPoints(numericValue.toString());
                    setPointsAvailable(initialPointsAvailable - numericValue);
                  } else if (numericValue > initialPointsAvailable) {
                    setPoints(initialPointsAvailable.toString());
                    setPointsAvailable(0);
                  } else {
                    setPoints('');
                    setPointsAvailable(2000);
                  }
                } catch {}
              }}
              value={points}
              onReset={() => setPoints('0')}
            />
          </View>

          <StyledText
            type="ListItemSubTitle"
            color={
              theme.lightGrey
            }>{`Access tracking for ${actions.translateGameName(
            gameId,
          )} for`}</StyledText>
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
