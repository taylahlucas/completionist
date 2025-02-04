import { useState } from 'react';
import {
  initPaymentSheet,
  presentPaymentSheet,
} from '@stripe/stripe-react-native';
import { GameKeyEnum } from '@utils/CustomEnums';
import { useGetGameData } from '@data/hooks/useGetGameData';
import { useTranslateGameContent } from '@data/hooks/index';
import useMainState from '@redux/hooks/useMainState';
import { allGameData } from '@utils/configs/gameConfigs';
import useEndpoints from '@data/api/hooks/useEndpoints.native';
import { Alert } from 'react-native';
import { GameData } from '@utils/CustomInterfaces';

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

const usePurchaseGame = (gameId: GameKeyEnum): UsePurchaseGameReturnType => {
  const { translateGameName } = useTranslateGameContent();
  const selectedGame = allGameData.find(game => game.id === gameId);

  if (!selectedGame) {
    console.log('Could not find selected game');
    throw Error('Could not find selected game data');
  }

  const { getAllData } = useGetGameData(selectedGame);
  // TODO: get number of quests, collectables, locations and misc
  const { quests, collectables, locations, miscellaneous } = getAllData(gameId);
  const { createPayment } = useEndpoints();
  const { user } = useMainState();
  const initialPointsAvailable = 2000;
  const [pointsAvailable, setPointsAvailable] = useState(
    initialPointsAvailable,
  );
  const [points, setPoints] = useState('');

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert('Payment failed', error.message);
    } else {
      Alert.alert('Success', 'Your payment was confirmed!');
    }
  };

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

  const handlePayment = async () => {
    const data = await fetchPaymentIntent();

    if (!data) {
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
