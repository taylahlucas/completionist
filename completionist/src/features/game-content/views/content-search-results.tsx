import React from 'react';
import { ScrollableList, ListItem, StyledText } from '@components/general';
import { useContentDispatch } from '../provider';
import { useGetContent, useUpdateContent } from './hooks';
import { ContentSectionEnum, GameData, sectionTypes } from '@utils/index';
import { isGameItemComplete } from './helpers';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

export const ContentSearchResults = ({
  section,
  selectedGameData,
}: {
  section: ContentSectionEnum;
  selectedGameData: GameData;
}) => {
  const { t } = useTranslation();
  const { setWebViewHref } = useContentDispatch();
  const { getFilteredContentForSection } = useGetContent(section);
  const { updateContentComplete } = useUpdateContent(section, selectedGameData);

  return (
    <ScrollableList>
      {sectionTypes.map((sectionType, index) => {
        {
          const sectionData = getFilteredContentForSection(sectionType);
          if (sectionData?.length === 0) {
            return <></>;
          }
          const titlePadding =
            index !== 0 ? { paddingTop: 16 } : { paddingTop: 8 };
          return (
            <View key={`${sectionType}-${index}`}>
              <View style={{ paddingBottom: 8, ...titlePadding }}>
                <StyledText>{t(`common:screens.${sectionType}`)}</StyledText>
              </View>
              {sectionData?.map(item => (
                <ListItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  isComplete={isGameItemComplete(
                    section,
                    item.id,
                    selectedGameData,
                  )}
                  onLongPress={(): void => setWebViewHref(item.href)}
                  action={(): void => updateContentComplete(item.id)}
                />
              ))}
            </View>
          );
        }
      })}
    </ScrollableList>
  );
};
