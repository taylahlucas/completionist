import { useIsRequestLoading } from '@data/api/hooks';
import { useMainState, useMainDispatch } from '@redux/hooks';
import { useActivateGame, useEditUserData } from '@data/hooks';
import { getFormattedSearchString } from '@utils/helpers/index';
import { allGameData } from '@utils/configs/game-configs';
import { useState } from 'react';
import { GameKeyEnum } from '@utils/index';
import { useTranslation } from 'react-i18next';
import { useLoginDispatch, useLoginState } from '@features/login/provider';
import { useFilterGameList } from '@utils/hooks';

export const useSelectFirstGame = () => {
  const { t } = useTranslation();
  const [selectedFirstGame, setSelectedFirstGame] = useState<GameKeyEnum>();
  const [searchValue, setSearchValue] = useState('');
  const { user } = useMainState();
  const { setSelectedGameDataSettings } = useMainDispatch();
  const { isGoogleSignIn } = useLoginState();
  const { setIsGoogleSignIn } = useLoginDispatch();
  const isRequestLoading = useIsRequestLoading();
  const { updateUserData } = useEditUserData();
  const { activateGame } = useActivateGame();
  const { filterGameList } = useFilterGameList();

  return {
    viewModel: {
      user,
      searchValue,
      selectedFirstGame,
      filteredGames: filterGameList(
        allGameData,
        getFormattedSearchString(searchValue),
      ),
      isLoading: isRequestLoading,
      isGoogleSignIn,
    },
    actions: {
      setSearchValue,
      setSelectedFirstGame,
      updateUserData,
      activateGame,
      setIsGoogleSignIn,
      setSelectedGameDataSettings,
    },
  };
};
