import { useEffect, useState } from 'react';
import {
  initPaymentSheet,
  presentPaymentSheet,
} from '@stripe/stripe-react-native';
import { GameKeyEnum } from '@utils/custom-enums';
import { useActivateGame, useTranslateGameContent } from '@data/hooks/index';
import { useMainState } from '@redux/hooks';
import { allGameData } from '@utils/configs/game-configs';
import { createPayment } from '@data/api/endpoints';
import { Alert } from 'react-native';
import { GameContentState, GameData } from '@utils/custom-interfaces';
import { useReactNavigation } from '@navigation/hooks';
import { getPriceForGame } from '@data/hooks/index';
import { getGameDataFromCache } from '@data/helpers/get-game-data-from-cache';
import { getMappedGameData } from '@data/helpers/map-game-data';
import { useTranslation } from 'react-i18next';

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
    gamePrice: string;
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

export const usePurchaseGame = (
  gameId: GameKeyEnum,
): UsePurchaseGameReturnType => {
  const { t } = useTranslation();
  const { translateGameName } = useTranslateGameContent();
  const navigation = useReactNavigation();
  const selectedGame = allGameData.find(game => game.id === gameId);
  const [gameContent, setGameContent] = useState<GameContentState>({
    quests: [],
    collectables: [],
    locations: [],
    miscellaneous: [],
  });

  useEffect(() => {
    getGameDataFromCache({ selectedGame: gameId }).then(response => {
      const mappedGameData = getMappedGameData(response);
      setGameContent(mappedGameData);
    });
  }, []);

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
  const gamePrice = getPriceForGame(selectedGame?.tier);

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
            text: t('common:alerts.cta.ok'),
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
        amount: gamePrice.amount,
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
      questsLength: gameContent?.quests.length ?? 0,
      collectablesLength: gameContent?.collectables.length ?? 0,
      locationsLength: gameContent?.locations.length ?? 0,
      miscLength: gameContent?.miscellaneous.length ?? 0,
      selectedGame: selectedGame ?? allGameData[0],
      initialPointsAvailable,
      pointsAvailable,
      points,
      gamePrice: gamePrice.title,
    },
    actions: {
      translateGameName,
      setPoints,
      setPointsAvailable,
      handlePayment,
    },
  };
};
