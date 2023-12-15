import React, { useEffect, useState } from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import MiscList from '@components/custom/MiscList/MiscList.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import { CompletedQuantityTitle } from '@components/general/Text/StyledTextStyledComponents.native';
import useMainState from '@redux/hooks/useMainState';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';
import useGetGameData from '@data/hooks/useGetGameData.native';

const Miscellaneous = () => {
  const { user, selectedGame } = useMainState();
  const [completedMiscItems, setCompletedMiscItems] = useState<number>(0);
  const { mapDataToMiscItems } = useGetGameData();

  useEffect(() => {
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        setCompletedMiscItems(user.data?.skyrim?.miscellaneous?.length);
        return
      case SubscriptionTypeEnum.FALLOUT_4:
        setCompletedMiscItems(user.data?.fallout4?.miscellaneous?.length);
        return
      default:
    }
  }, [selectedGame])

  return (
    <StandardLayout>
      <NavigationHeader title={'Miscellaneous'} />
      <CustomSearchBar />
      <CompletedQuantityTitle type={'ListItemTitleBold'}>{`${completedMiscItems}/${mapDataToMiscItems(selectedGame).length}`}</CompletedQuantityTitle>
      <MiscList />
    </StandardLayout>
  );
};

export default Miscellaneous;