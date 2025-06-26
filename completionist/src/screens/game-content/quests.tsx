import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  StandardLayout,
  CustomSearchBar,
  CompletedQuantityTitle,
} from '@components/general';
import { NavigationHeader } from '@navigation/index';
import { ContentList } from '@components/custom';
import { DrawerScreenEnum } from '@utils/index';
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
