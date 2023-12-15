import React, { useEffect, useState } from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import CollectableList from '@components/custom/CollectableList/CollectableList.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import { CompletedQuantityTitle } from '@components/general/Text/StyledTextStyledComponents.native';
import useMainState from '@redux/hooks/useMainState';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';
import useGetGameData from '@data/hooks/useGetGameData.native';

const Collectables = () => {
  const { user, selectedGame } = useMainState();
  const [completedCollectables, setCompletedCollectables] = useState<number>(0);
  const { mapDataToCollectables } = useGetGameData();

  useEffect(() => {
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        setCompletedCollectables(user.data?.skyrim?.collectables?.length);
        return
      case SubscriptionTypeEnum.FALLOUT_4:
        setCompletedCollectables(user.data?.fallout4?.collectables?.length);
        return
      default:
    }
  }, [selectedGame])

  return (
    <StandardLayout>
      <NavigationHeader title={'Collectables'} />
      <CustomSearchBar />
      <CompletedQuantityTitle type={'ListItemTitleBold'}>
        {`${completedCollectables}/${mapDataToCollectables(selectedGame).length}`}
      </CompletedQuantityTitle>
      <CollectableList />
    </StandardLayout>
  );
};

export default Collectables;