import React from 'react';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import { CompletedQuantityTitle } from '@components/general/Text/StyledTextStyledComponents.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import useGetGameData from '@data/hooks/useGetGameData';
import useGetUserGameData from '@data/hooks/useGetUserGameData';
import useMainState from '@redux/hooks/useMainState';
import useContentDispatch from '@components/custom/ContentList/hooks/useContentDispatch';
import useContentState from '@components/custom/ContentList/hooks/useContentState';
import ContentList from '@components/custom/ContentList/ContentList.native';
import { ContentSectionEnum } from '@utils/CustomEnums';

const Locations = () => {
  const { t } = useTranslation();
  const { selectedGame } = useMainState();
  const { setSearchValue } = useContentDispatch();
  const { searchValue } = useContentState();
  const { getUserLocations } = useGetUserGameData();
  const { mapDataTo } = useGetGameData();

  return (
    <StandardLayout>
      <NavigationHeader title={t('common:screens.locations')} rightAction='filter' />
      <CustomSearchBar 
        searchValue={searchValue} 
        setSearchValue={setSearchValue}
        onReset={(): void => setSearchValue('')} 
      />
      <CompletedQuantityTitle type={'ListItemTitleBold'}>{`${getUserLocations().length}/${mapDataTo(ContentSectionEnum.LOCATIONS, selectedGame, true).length}`}</CompletedQuantityTitle>
      <ContentList />
    </StandardLayout>
  );
};

export default Locations;