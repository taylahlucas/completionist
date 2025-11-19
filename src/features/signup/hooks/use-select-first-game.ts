import { useIsRequestLoading } from '@data/api/hooks';
import { useMainDispatch } from '@redux/hooks';
import { useActivateGame, useEditUserData } from '@data/hooks';
import { getFormattedSearchString } from '@utils/helpers/index';
import { allGameData } from '@utils/configs/game-configs';
import { useState } from 'react';
import { GameKeyEnum } from '@utils/index';
import { useFilterGameList } from '@utils/hooks';
import { useAuthDispatch, useAuthState } from '@redux/auth';

export const useSelectFirstGame = () => {
  const [selectedFirstGame, setSelectedFirstGame] = useState<GameKeyEnum>();
  const [searchValue, setSearchValue] = useState('');
  const { setSelectedGameDataSettings } = useMainDispatch();
  const { user, isGoogleSignIn } = useAuthState();
  const { setIsGoogleSignIn } = useAuthDispatch();
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
