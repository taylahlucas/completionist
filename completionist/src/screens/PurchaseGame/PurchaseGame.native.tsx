import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
import { View } from 'react-native';
import useGetTheme from '@styles/hooks/useGetTheme';

const PurchaseGame = (params: any) => {
  const { t } = useTranslation();
  const theme = useGetTheme();
  const gameId = params.route?.params.gameId;
  const { viewModel, actions } = usePurchaseGame(gameId);
  const selectedGame = allGameData.find(game => game.id === gameId);
  const initialPointsAvailable = 2000;
  const [pointsAvailable, setPointsAvailable] = useState(
    initialPointsAvailable,
  );
  const [points, setPoints] = useState('');

  if (!selectedGame) {
    console.log('Could not find selected game');
    return;
  }

  // TODO: Add translations, add styles to style file
  return (
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
            onPress={(): void => console.log('Pay')}
          />
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
  );
};

export default PurchaseGame;
