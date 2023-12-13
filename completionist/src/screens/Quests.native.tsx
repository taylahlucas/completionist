import React from 'react';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import QuestList from '@components/custom/QuestList/QuestList.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import { CompletedQuantityTitle } from '@components/general/Text/StyledTextStyledComponents.native';
import { mappedQuests } from '@data/functions';
import useMainState from '@redux/hooks/useMainState';

const Quests = () => {
  const { user } = useMainState();

  return (
    <StandardLayout>
      <NavigationHeader title={'Quests'} />
      <CustomSearchBar />
      <CompletedQuantityTitle type={'ListItemTitleBold'}>
        {`${user.data.skyrim.quests.length}/${mappedQuests.length}`}
      </CompletedQuantityTitle>
      <QuestList />
    </StandardLayout>
  );
};

export default Quests;