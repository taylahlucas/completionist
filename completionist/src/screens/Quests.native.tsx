import React, { useEffect, useState } from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import QuestList from '@components/custom/QuestList/QuestList.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import { CompletedQuantityTitle } from '@components/general/Text/StyledTextStyledComponents.native';
import useMainState from '@redux/hooks/useMainState';
import useGetGameData from '@data/hooks/useGetGameData.native';
import { SubscriptionTypeEnum } from '@utils/CustomEnums';

const Quests = () => {
  const { user, selectedGame } = useMainState();
  const [completedQuests, setCompletedQuests] = useState<number>(0);
  const { mapDataToQuests } = useGetGameData();

  useEffect(() => {
    switch (selectedGame) {
      case SubscriptionTypeEnum.SKYRIM:
        setCompletedQuests(user.data?.skyrim?.quests?.length);
        return
      case SubscriptionTypeEnum.FALLOUT_4:
        setCompletedQuests(user.data?.fallout4?.quests?.length);
        return
      default:
    }
  }, [selectedGame])

  return (
    <StandardLayout>
      <NavigationHeader title={'Quests'} />
      <CustomSearchBar />
      <CompletedQuantityTitle type={'ListItemTitleBold'}>
        {`${completedQuests ?? 0}/${mapDataToQuests(selectedGame).length}`}
      </CompletedQuantityTitle>
      <QuestList />
    </StandardLayout>
  );
};

export default Quests;