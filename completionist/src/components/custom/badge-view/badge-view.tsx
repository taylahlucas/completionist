import React from 'react';
import { View } from 'react-native';
import { ScrollableList } from '@components/general/Lists/index';
import { BadgeItem } from '@utils/CustomInterfaces';
import { LARGE_WIDTH } from '@styles/global.native';
import useGetTheme from '@styles/hooks/useGetTheme';

interface BadgeViewProps {
  items: BadgeItem[];
}

export const BadgeView = ({ items }: BadgeViewProps) => {
  const theme = useGetTheme();

  return (
    <ScrollableList
      isHorizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{ width: LARGE_WIDTH, maxHeight: 110 }}
      contentContainerStyle={{
        paddingBottom: 0,
      }}>
      {items.map(item => (
        <View
          key={item.id}
          style={{
            backgroundColor: theme.lightPurple,
            width: 100,
            height: 100,
            borderRadius: 25,
            marginRight: 12,
          }}
        />
      ))}
    </ScrollableList>
  );
};
