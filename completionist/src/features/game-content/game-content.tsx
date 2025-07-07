import React from 'react';
import { useTranslation } from 'react-i18next';
import { CustomSearchBar, CompletedQuantityTitle } from '@components/general';
import { ContentSectionEnum } from '@utils/index';
import { ContentList } from '@features/game-content';
import { useMainState } from '@redux/hooks';
import { useContentDispatch, useContentState } from './provider';
import { getCompletedGameDataForSection } from '@data/index';

export const GameContent = ({ section }: { section: ContentSectionEnum }) => {
  const { t } = useTranslation();
  const { selectedGame } = useMainState();
  const { setSearchValue } = useContentDispatch();
  const { searchValue, gameContent } = useContentState();
  const sectionData = getCompletedGameDataForSection(section, selectedGame);

  const totalItems = () => {
    switch (section) {
      case ContentSectionEnum.QUESTS:
        return gameContent?.quests.length;
      case ContentSectionEnum.COLLECTABLES:
        return gameContent?.collectables.length;
      case ContentSectionEnum.LOCATIONS:
        return gameContent?.locations.length;
      case ContentSectionEnum.MISCELLANEOUS:
        return gameContent?.miscellaneous.length;
      default:
        return 0;
    }
  };

  return (
    <>
      <CustomSearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onReset={(): void => setSearchValue('')}
      />
      <CompletedQuantityTitle type={'ListItemSubTitleBold'}>
        {`${sectionData.length}/${totalItems.length}`}
      </CompletedQuantityTitle>
      <ContentList />
    </>
  );
};
