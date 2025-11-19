import React, { useState } from 'react';
import { ScrollView, ScrollViewProps, ViewStyle } from 'react-native';
import { Condition, listStyles, ListShowMoreButton } from '@components/general';
import { renderAmountConst } from '@utils/index';
import { useTranslation } from 'react-i18next';

interface CustomListProps extends ScrollViewProps {
  children: React.JSX.Element[];
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  isHorizontal?: boolean;
  renderAmount?: number;
}

export const ScrollableList = React.forwardRef<ScrollView, CustomListProps>(
  (
    {
      children,
      style,
      contentContainerStyle,
      isHorizontal = false,
      renderAmount = renderAmountConst,
      ...props
    }: CustomListProps,
    ref,
  ) => {
    const { t } = useTranslation();
    const { bounces } = props;
    const [updatedRenderAmount, setUpdatedRenderAmount] =
      useState(renderAmount);
    // This handles autoScroll for dropdown lists to ensure the entire list is in view
    const paddingBottom: number =
      (contentContainerStyle?.paddingBottom as number) ?? 80;

    return (
      <ScrollView
        ref={ref}
        testID="scrollable-list"
        contentContainerStyle={{
          ...contentContainerStyle,
          ...listStyles.scrollableContent,
          paddingBottom,
        }}
        style={style}
        horizontal={isHorizontal}
        bounces={bounces}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={props.showsHorizontalScrollIndicator}>
        <Condition
          condition={children.length > updatedRenderAmount}
          conditionalElement={children}>
          {children.slice(0, updatedRenderAmount)}
          <ListShowMoreButton
            title={t('common:showMore')}
            type="text"
            onPress={(): void =>
              setUpdatedRenderAmount(updatedRenderAmount + renderAmountConst)
            }
          />
        </Condition>
      </ScrollView>
    );
  },
);

ScrollableList.displayName = 'ScrollableList';
