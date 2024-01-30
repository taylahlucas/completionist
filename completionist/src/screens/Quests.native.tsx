import React from 'react';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import { CompletedQuantityTitle } from '@components/general/Text/StyledTextStyledComponents.native';
import useGetGameData from '@data/hooks/useGetGameData';
import useGetUserGameData from '@data/hooks/useGetUserGameData';
import useMainState from '@redux/hooks/useMainState';
import ContentList from '@components/custom/ContentList/ContentList.native';
import useContentState from '@components/custom/ContentList/hooks/useContentState';
import useContentDispatch from '@components/custom/ContentList/hooks/useContentDispatch';
import { ContentSectionEnum } from '@utils/CustomEnums';

const Quests = () => {
  const { t } = useTranslation();
  const sectionTitle = t('common:screens.quests');
  const { selectedGame } = useMainState();
  const { setSearchValue } = useContentDispatch();
  const { searchValue } = useContentState();
  const { getUserQuests } = useGetUserGameData();
  const { mapDataTo } = useGetGameData();

  return (
    <StandardLayout>
      <NavigationHeader title={sectionTitle} />
      <CustomSearchBar 
        searchValue={searchValue} 
        setSearchValue={setSearchValue}
        onReset={(): void => setSearchValue('')} 
      />
      <CompletedQuantityTitle type={'ListItemTitleBold'}>
        {`${getUserQuests().length}/${mapDataTo(ContentSectionEnum.QUESTS, selectedGame, true).length}`}
      </CompletedQuantityTitle>
      <ContentList />
    </StandardLayout>
  );
};

export default Quests;