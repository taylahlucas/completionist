import React, { forwardRef, useCallback } from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { LARGE_PADDING } from '@styles/global';
import useGetTheme from '@styles/hooks/use-get-theme';

interface SheetProps {
  backgroundColor?: string;
  enablePanGestures?: boolean;
  children: React.ReactNode;
  onBackdropPress?: () => void;
}

export const Sheet = forwardRef<BottomSheet, SheetProps>(
  ({ backgroundColor, enablePanGestures, children, onBackdropPress }, ref) => {
    const { bottom } = useSafeAreaInsets();
    const theme = useGetTheme();
    const bgColor = backgroundColor ?? theme.black;

    const renderBackdrop = useCallback(
      (props: BottomSheetDefaultBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          style={{ backgroundColor: 'black' }}
          onPress={onBackdropPress}
        />
      ),
      [backgroundColor, onBackdropPress],
    );

    return (
      <BottomSheet
        ref={ref}
        enablePanDownToClose={enablePanGestures ?? true}
        backdropComponent={renderBackdrop}
        backgroundComponent={null}
        style={{
          backgroundColor,
          overflow: 'hidden',
        }}>
        <BottomSheetView>
          <View
            testID="bottom-sheet"
            style={{
              borderTopLeftRadius: LARGE_PADDING,
              borderTopRightRadius: LARGE_PADDING,
              backgroundColor: bgColor,
              paddingBottom: Math.max(bottom, 16),
            }}>
            {children}
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);
