import React from 'react';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import { NavigationHeader } from '@navigation/index';
import CustomSearchBar from '@components/general/custom-search-bar/custom-search-bar';
import { CompletedQuantityTitle } from '@components/general/Text/StyledTextStyledComponents.native';
import { ContentList } from '@components/custom';
import { DrawerScreenEnum } from '@utils/custom-enums';
import { useGameContent } from './hooks';

export const Quests = () => {
  const { t } = useTranslation();
  const { viewModel, actions } = useGameContent();

  return (
    <StandardLayout>
      <NavigationHeader
        id={DrawerScreenEnum.Quests}
        title={t('common:screens.quests')}
      />
      <CustomSearchBar
        searchValue={viewModel.searchValue}
        setSearchValue={actions.setSearchValue}
        onReset={(): void => actions.setSearchValue('')}
      />
      <CompletedQuantityTitle type={'ListItemSubTitleBold'}>
        {`${viewModel.quests.completed}/${viewModel.quests.total}`}
      </CompletedQuantityTitle>
      <ContentList />
    </StandardLayout>
  );
};
