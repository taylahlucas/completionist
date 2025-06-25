import React from 'react';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import { NavigationHeader } from '@navigation/index';
import CustomSearchBar from '@components/general/custom-search-bar/custom-search-bar';
import { CompletedQuantityTitle } from '@components/general/Text/StyledTextStyledComponents.native';
import { DrawerScreenEnum } from '@utils/custom-enums';
import { useGameContent } from './hooks';
import { ContentList } from '@components/custom';

export const Collectables = () => {
  const { t } = useTranslation();
  const { viewModel, actions } = useGameContent();

  return (
    <StandardLayout>
      <NavigationHeader
        id={DrawerScreenEnum.Collectables}
        title={t('common:screens.collectables')}
      />
      <CustomSearchBar
        searchValue={viewModel.searchValue}
        setSearchValue={actions.setSearchValue}
        onReset={(): void => actions.setSearchValue('')}
      />
      <CompletedQuantityTitle type={'ListItemSubTitleBold'}>
        {`${viewModel.collectables.completed}/${viewModel.collectables.total}`}
      </CompletedQuantityTitle>
      <ContentList />
    </StandardLayout>
  );
};
