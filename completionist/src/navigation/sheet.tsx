import React, { forwardRef } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';

interface SheetProps {
  backgroundColor?: string;
  enablePanGestures?: boolean;
  children: React.ReactNode;
}

export const Sheet = forwardRef<BottomSheet, SheetProps>(
  ({ backgroundColor, enablePanGestures, children }, ref) => {
    const { bottom } = useSafeAreaInsets();

    return (
      <BottomSheet ref={ref} enablePanDownToClose={enablePanGestures ?? true}>
        <BottomSheetView>
          <View
            testID="bottom-sheet"
            style={{ backgroundColor, paddingBottom: Math.max(bottom, 16) }}>
            {children}
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);
