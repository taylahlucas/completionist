import React, { useEffect, useState } from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import { CompletedQuantityTitle } from '@components/general/Text/StyledTextStyledComponents.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import useMainState from '@redux/hooks/useMainState';
import LocationList from '@components/custom/LocationList/LocationList.native';
import useGetGameData from '@data/hooks/useGetGameData.native';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';

const Locations = () => {
  const { user, selectedGame } = useMainState();
  const [completedLocations, setCompletedLocations] = useState<number>(0);
  const { mapDataToMiscItems } = useGetGameData();
  
  // TODO: Move to custom hook and return number instead of useState. Use in NavigationDrawer
  useEffect(() => {
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        setCompletedLocations(user.data?.skyrim?.locations?.length);
        return;
      case SubscriptionTypeEnum.FALLOUT_4:
        setCompletedLocations(user.data?.fallout4?.locations?.length);
        return;
      default:
    }
  }, [selectedGame])

  // TODO: Fallout locations
  return (
    <StandardLayout>
      <NavigationHeader title={'Locations'} />
      <CustomSearchBar />
      <CompletedQuantityTitle type={'ListItemTitleBold'}>{`${completedLocations}/${mapDataToMiscItems(selectedGame).length}`}</CompletedQuantityTitle>
      <LocationList />
    </StandardLayout>
  );
};

export default Locations;