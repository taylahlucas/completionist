import React from 'react';
import {
  CustomSearchBar,
  CompletedQuantityTitle,
  Loading,
} from '@components/general';
import { ContentSectionEnum } from '@utils/index';
import { useMainState } from '@redux/hooks';
import { useContentDispatch, useContentState } from './provider';
import { getCompletedGameDataForSection } from '@data/index';
import { ContentList } from './views';

export const GameContent = ({ section }: { section: ContentSectionEnum }) => {
  const { selectedGame } = useMainState();
  const { setSearchValue } = useContentDispatch();
  const { searchValue, gameContent } = useContentState();
  const sectionData = getCompletedGameDataForSection(section, selectedGame);

  // TODO: Test if this works
  if (!selectedGame || !gameContent) {
    return <Loading />;
  }

  let totalItems = 0;
  switch (section) {
    case ContentSectionEnum.QUESTS:
      totalItems = gameContent.quests.length;
      break;
    case ContentSectionEnum.COLLECTABLES:
      totalItems = gameContent.collectables.length;
      break;
    case ContentSectionEnum.LOCATIONS:
      totalItems = gameContent.locations.length;
      break;
    case ContentSectionEnum.MISCELLANEOUS:
      totalItems = gameContent.miscellaneous.length;
      break;
    default:
      totalItems = 0;
      break;
  }

  return (
    <>
      <CustomSearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onReset={(): void => setSearchValue('')}
      />
      <CompletedQuantityTitle type={'ListItemSubTitleBold'}>
        {`${sectionData.length}/${totalItems}`}
      </CompletedQuantityTitle>
      <ContentList section={section} selectedGame={selectedGame} />
    </>
  );
};
