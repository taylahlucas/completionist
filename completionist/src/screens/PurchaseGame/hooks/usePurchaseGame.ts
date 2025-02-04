import { useState } from 'react';
import {
  initPaymentSheet,
  presentPaymentSheet,
} from '@stripe/stripe-react-native';
import { GameKeyEnum } from '@utils/CustomEnums';
import { useGetGameData } from '@data/hooks/useGetGameData';
import { useActivateGame, useTranslateGameContent } from '@data/hooks/index';
import useMainState from '@redux/hooks/useMainState';
import { allGameData } from '@utils/configs/gameConfigs';
import useEndpoints from '@data/api/hooks/useEndpoints.native';
import { Alert } from 'react-native';
import { GameData } from '@utils/CustomInterfaces';
import useReactNavigation from '@navigation/hooks/useReactNavigation.native';

interface UsePurchaseGameReturnType {
  viewModel: {
    questsLength: number;
    collectablesLength: number;
    locationsLength: number;
    miscLength: number;
    selectedGame: GameData;
    initialPointsAvailable: number;
    pointsAvailable: number;
    points: string;
  };
  actions: {
    translateGameName: (title: GameKeyEnum) => string;
    setPoints: (value: string) => void;
    setPointsAvailable: (value: number) => void;
    handlePayment: () => void;
  };
}

interface PaymentIntentReturnType {
  paymentIntent: string;
  ephemeralKey: string;
  customer: string;
}

const usePurchaseGame = (gameId: GameKeyEnum): UsePurchaseGameReturnType => {
  const { translateGameName } = useTranslateGameContent();
  const navigation = useReactNavigation();
  const selectedGame = allGameData.find(game => game.id === gameId);
  const { getAllData } = useGetGameData(selectedGame);
  const { quests, collectables, locations, miscellaneous } = getAllData(gameId);
  const { createPayment } = useEndpoints();
  const { activateGame } = useActivateGame();
  const { user } = useMainState();
  const initialPointsAvailable = 2000;
  const [pointsAvailable, setPointsAvailable] = useState(
    initialPointsAvailable,
  );
  const [points, setPoints] = useState('');

  if (!selectedGame) {
    // TODO: Throw error and log
    console.log('Could not find selected game');
    throw Error('Could not find selected game data');
  }

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      if (error.code === 'Canceled') {
        return;
      } else {
        Alert.alert('Payment failed', error.message);
      }
    } else {
      try {
        activateGame(user, selectedGame.id);
        Alert.alert('Success', 'Your payment was confirmed!', [
          {
            text: 'Ok',
            onPress: () => navigation.goBack(),
          },
        ]);
      } catch {
        // TODO: Log error
        Alert.alert('Payment failed', 'Please try again.');
      }
    }
  };

  const fetchPaymentIntent = async (): Promise<
    PaymentIntentReturnType | undefined
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
      // TODO: Throw error and log
      console.error('Error fetching payment intent:', error);
      return;
    }
  };

  const handlePayment = async () => {
    const data = await fetchPaymentIntent();

    if (!data) {
      // TODO: Throw error and log
      console.log('Could not get payment intent');
      return;
    }

    const { error } = await initPaymentSheet({
      merchantDisplayName: 'TTech Designs Ltd.',
      customerId: data.customer,
      customerEphemeralKeySecret: data.ephemeralKey,
      paymentIntentClientSecret: data.paymentIntent,
      allowsDelayedPaymentMethods: true,
      returnURL: 'completionist://stripe-redirect',
    });

    if (!error) {
      openPaymentSheet();
    } else {
      // TODO: Throw error and log
      console.log('Error Handling Payment: ', error);
    }
  };

  return {
    viewModel: {
      questsLength: quests.data.length,
      collectablesLength: collectables.data.length,
      locationsLength: locations.data.length,
      miscLength: miscellaneous.data.length,
      selectedGame: selectedGame ?? allGameData[0],
      initialPointsAvailable,
      pointsAvailable,
      points,
    },
    actions: {
      translateGameName,
      setPoints,
      setPointsAvailable,
      handlePayment,
    },
  };
};

export default usePurchaseGame;
