import React from 'react';
import {
  CheckBox,
  SelectionListContainer,
  SelectionListItemContainer,
  SelectListTitle,
} from '../';
import useGetTheme from '@styles/hooks/use-get-theme';
import { IsActive } from '@utils/index';
import { useTranslation } from 'react-i18next';

export type SelectionListType = 'enable-dlc' | 'show-hide-sections';

interface SelectionListProps {
  type: SelectionListType;
  data: IsActive[];
  translationKey: string;
  onPress: (title: string) => void;
}

export const SelectionList = ({
  data,
  type,
  translationKey,
  onPress,
}: SelectionListProps) => {
  const { t } = useTranslation();
  const theme = useGetTheme();

  const getTitleForType = (item: IsActive) => {
    switch (type) {
      case 'enable-dlc':
        return t(`common:categories.${translationKey}.dlc.${item.id}`);
      case 'show-hide-sections':
        return t(`common:settings.${translationKey}`);
    }
  };

  return (
    <SelectionListContainer>
      {data.map((item, index) => (
        <SelectionListItemContainer key={index}>
          <SelectListTitle align="left" color={theme.lightGrey}>
            {getTitleForType(item)}
          </SelectListTitle>
          <CheckBox
            isActive={item.isActive}
            onPress={(): void => onPress(item.id)}
          />
        </SelectionListItemContainer>
      ))}
    </SelectionListContainer>
  );
};
