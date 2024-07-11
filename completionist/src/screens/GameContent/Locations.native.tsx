import React from 'react';
import { useTranslation } from 'react-i18next';
import StandardLayout from '@components/general/Layouts/StandardLayout.native';
import { CompletedQuantityTitle } from '@components/general/Text/StyledTextStyledComponents.native';
import NavigationHeader from '@navigation/NavigationHeader.native';
import CustomSearchBar from '@components/general/CustomSearchBar/CustomSearchBar.native';
import useGetGameData from '@data/hooks/useGetGameData';
import useGetUserGameData from '@data/hooks/useGetUserGameData';
import useMainState from '@redux/hooks/useMainState';
import useContentDispatch from '@components/custom/ContentList/hooks/useContentDispatch';
import useContentState from '@components/custom/ContentList/hooks/useContentState';
import ContentList from '@components/custom/ContentList/ContentList.native';
import { ContentSectionEnum } from '@utils/CustomEnums';
import { DrawerScreenEnum } from '@utils/CustomEnums';
import useGameContent from './hooks/useGameContent';

const Locations = () => {
  const { t } = useTranslation();
	const { viewModel, actions } = useGameContent();

  return (
    <StandardLayout>
      <NavigationHeader id={DrawerScreenEnum.Locations} title={t('common:screens.locations')} />
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

export default Locations;