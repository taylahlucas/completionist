import React from 'react';
import { View } from 'react-native';
import useGetTheme from '@styles/hooks/use-get-theme';
import { GameKeyEnum, ProgressItemData } from '@utils/index';
import { ProgressChartItem } from './';
import { STANDARD_WIDTH } from '@styles/global';
import { getGameProgressForSection } from './helpers';
import { useAuthUser } from '@redux/auth';

interface ProgressViewProps {
  gameId: string;
  data: ProgressItemData[];
}

export const ProgressView = ({ gameId, data }: ProgressViewProps) => {
  const theme = useGetTheme();
  const user = useAuthUser();
  const colors = [theme.lightPurple, '#E63656', '#26AB9D', '#D1A34D'];

  return (
    <View
      style={{
        height: 140,
        width: STANDARD_WIDTH,
        alignSelf: 'center',
        paddingTop: 8,
      }}>
      {data.map((item, index) => (
        <ProgressChartItem
          key={item.id}
          id={item.id}
          current={getGameProgressForSection(
            gameId as GameKeyEnum,
            item.id,
            user,
          )}
          total={item.total}
          foregroundColor={colors[index]}
          backgroundColor={theme.darkGrey}
        />
      ))}
    </View>
  );
};
