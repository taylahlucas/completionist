import React from 'react';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/layouts/standard-layout';
import { NavigationHeader } from '@navigation/index';
import CustomSearchBar from '@components/general/custom-search-bar/custom-search-bar';
import { CompletedQuantityTitle } from '@components/general/text/styled-text-styled-components';
import { ContentList } from '@components/custom';
import { DrawerScreenEnum } from '@utils/custom-enums';
import { useGameContent } from './hooks';

export const Miscellaneous = () => {
  const { t } = useTranslation();
  const { viewModel, actions } = useGameContent();

  return (
    <StandardLayout>
      <NavigationHeader
        id={DrawerScreenEnum.Miscellaneous}
        title={t('common:screens.miscellaneous')}
      />
      <CustomSearchBar
        searchValue={viewModel.searchValue}
        setSearchValue={actions.setSearchValue}
        onReset={(): void => actions.setSearchValue('')}
      />
      <CompletedQuantityTitle type={'ListItemSubTitleBold'}>
        {`${viewModel.misc.completed}/${viewModel.misc.total}`}
      </CompletedQuantityTitle>
      <ContentList />
    </StandardLayout>
  );
};
