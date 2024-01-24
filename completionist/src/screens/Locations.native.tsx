import React, { useEffect } from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import { CompletedQuantityTitle } from '@components/general/Text/StyledTextStyledComponents.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import LocationList from '@components/custom/LocationList/LocationList.native';
import useGetGameData from '@data/hooks/useGetGameData';
import useGetUserGameData from '@data/hooks/useGetUserGameData';
import useMainState from '@redux/hooks/useMainState';
import useContentDispatch from '@components/custom/ContentList/hooks/useContentDispatch';
import useContentState from '@components/custom/ContentList/hooks/useContentState';

const Locations = () => {
  const sectionType = 'Locations';
  const { selectedGame } = useMainState();
  const { setSectionType, setSearchValue } = useContentDispatch();
  const { searchValue } = useContentState();
  const { getUserLocations } = useGetUserGameData();
  const { mapDataTo } = useGetGameData();

  useEffect(() => {
    setSectionType(sectionType);
  }, []);

  return (
    <StandardLayout>
      <NavigationHeader title={'Locations'} />
      <CustomSearchBar 
        searchValue={searchValue} 
        setSearchValue={setSearchValue}
        onReset={(): void => setSearchValue('')} 
      />
      <CompletedQuantityTitle type={'ListItemTitleBold'}>{`${getUserLocations().length}/${mapDataTo(sectionType, selectedGame, true).length}`}</CompletedQuantityTitle>
      <LocationList />
    </StandardLayout>
  );
};

export default Locations;