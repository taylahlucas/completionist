import React from 'react';
import { useTranslation } from 'react-i18next';
import { GameKeyEnum } from '@utils/index';
import { GameListItem } from '@components/custom';
import { usePurchaseGame } from './hooks';
import {
  Spacing,
  Button,
  StyledText,
  TextInput,
  KeyboardAvoidingScrollView,
} from '@components/general';
import { View } from 'react-native';
import useGetTheme from '@styles/hooks/use-get-theme';

export const PurchaseGameContent = ({ gameId }: { gameId: GameKeyEnum }) => {
  const { t } = useTranslation();
  const theme = useGetTheme();
  const { viewModel, actions } = usePurchaseGame(gameId);

  return (
    <KeyboardAvoidingScrollView
      awareView={
        <Button title={t('common:continue')} onPress={actions.handlePayment} />
      }>
      <GameListItem
        game={viewModel.selectedGameData}
        enabled={true}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
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
                actions.setPoints(viewModel.initialPointsAvailable.toString());
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

      <StyledText type="ListItemTitleBold" color={theme.lightGrey}>
        {`Access tracking for ${actions.translateGameName(gameId)} for`}
      </StyledText>
      <Spacing height={8} />
      <StyledText type="ListItemTitleBold" color={theme.lightGrey}>
        {`${viewModel.gamePrice}?`}
      </StyledText>
      <Spacing height={8} />
      <StyledText>{`This is a one-off payment.\n`}</StyledText>
    </KeyboardAvoidingScrollView>
  );
};
