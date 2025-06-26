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

export const Locations = () => {
  const { t } = useTranslation();
  const { viewModel, actions } = useGameContent();

  return (
    <StandardLayout>
      <NavigationHeader
        id={DrawerScreenEnum.Locations}
        title={t('common:screens.locations')}
      />
      <CustomSearchBar
        searchValue={viewModel.searchValue}
        setSearchValue={actions.setSearchValue}
        onReset={(): void => actions.setSearchValue('')}
      />
      <CompletedQuantityTitle type={'ListItemSubTitleBold'}>
        {`${viewModel.locations.completed}/${viewModel.locations.total}`}
      </CompletedQuantityTitle>
      <ContentList />
    </StandardLayout>
  );
};
