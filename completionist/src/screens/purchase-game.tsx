import React from 'react';
import { useTranslation } from 'react-i18next';
import { StripeProvider } from '@stripe/stripe-react-native';
import { NavigationHeader } from '@navigation/index';
import { AuthScreenEnum } from '@utils/index';
import { StandardLayout } from '@components/general';
import config from '@utils/configs/config';
import { PurchaseGameContent } from '@features/purchase-game/purchase-game-content';

export const PurchaseGame = (params: any) => {
  const { t } = useTranslation();
  const gameId = params.route?.params.gameId;

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
        <PurchaseGameContent gameId={gameId} />
      </StandardLayout>
    </StripeProvider>
  );
};
