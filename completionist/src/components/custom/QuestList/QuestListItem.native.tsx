import React from 'react';
import { Text, View } from 'react-native';
import { QuestListItemContainer } from './QuestListStyledComponents.native';

export interface QuestListItemProps {
  questCategory: string;
  questSubCategory: string;
  questSubCategoryType?: string;
  questTitle: string;
  href: string;
  isComplete: boolean;
}

const QuestListItem = ({
  questCategory,
  questSubCategory,
  questSubCategoryType,
  questTitle,
  href,
  isComplete
}: QuestListItemProps) => {
  return (
    <QuestListItemContainer>
      <Text>{questTitle}</Text>
      <Text>{questSubCategory}</Text>
    </QuestListItemContainer>
  );
};

export default QuestListItem;