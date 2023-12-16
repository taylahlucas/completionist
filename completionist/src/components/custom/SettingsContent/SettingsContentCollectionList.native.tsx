import React from 'react';
import { IconTypeEnum, SubscriptionTypeEnum } from '@utils/CustomEnums';
import ScrollableList from '@components/general/Lists/ScrollableList.native';
import useGetSettingsQuestCategories from './hooks/useGetSettingsQuestCategories';
import useGetTheme from '@styles/hooks/useGetTheme';
import { style, SettingsContentMainItem, SettingsContentMainItemTitle } from './SettingsContentStyledComponents.native';
import IconButton from '@components/general/Icon/IconButton.native';
import useSettingsState from './hooks/useSettingsState';
import useMainState from '@redux/hooks/useMainState';

const SettingsContentCollectionList = () => {
  const theme = useGetTheme();
  const { user } = useMainState();
  const { selectedGameSettings } = useSettingsState();
  const { getSettingsQuestCategories } = useGetSettingsQuestCategories();

  return (
    <ScrollableList 
      style={{ ...style.scrollView, borderColor: theme.midGrey }}
      contentContainerStyle={style.scrollContent}
    >
      {getSettingsQuestCategories(selectedGameSettings).map((category: string, index: number) => (
        <SettingsContentMainItem key={index} color={theme.darkGrey}>
          <SettingsContentMainItemTitle align={'left'} type={'ListItemTitleBold'}>{category}</SettingsContentMainItemTitle>
          <IconButton 
            name={'checkbox-outline'} 
            type={IconTypeEnum.Ionicons} 
            color={theme.lightGrey}
            size={22}
            onPress={() => null} 
          />
        </SettingsContentMainItem>
      ))}
    </ScrollableList>
  );
};

export default SettingsContentCollectionList;