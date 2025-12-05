import { GameKey, useIsRequestLoading } from '@api/';
import { useMainDispatch } from '@redux/hooks';
import { useActivateGame, useEditUserData } from '@data/hooks';
import { getFormattedSearchString } from '@utils/helpers/index';
import { allGameData } from '@utils/configs/game-configs';
import { useState } from 'react';
import { useFilterGameList } from '@hooks/';
import { useAuthDispatch, useAuthState, useAuthUser } from '@redux/auth';

export const useSelectFirstGame = () => {
  const [selectedFirstGame, setSelectedFirstGame] = useState<GameKey>();
  const [searchValue, setSearchValue] = useState('');
  const { setSelectedGameDataSettings } = useMainDispatch();
  const { isGoogleSignIn } = useAuthState();
  const user = useAuthUser();
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
