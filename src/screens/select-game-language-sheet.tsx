import { SelectGameLanguageContent } from '@features/select-game-language/select-game-language-content';
import BottomSheet from '@gorhom/bottom-sheet';
import { Sheet } from '@navigation/index';
import React from 'react';
import { useRef } from 'react';

export const SelectGameLanguageSheet = (params: any) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const gameId = params.route?.params.gameId;

  return (
    <Sheet ref={bottomSheetRef}>
      <SelectGameLanguageContent gameId={gameId} />
    </Sheet>
  );
};
