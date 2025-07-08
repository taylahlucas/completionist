import { filterGameList } from '@components/custom/game-list/hooks';
import { useIsRequestLoading } from '@data/api/hooks';
import { useMainState, useMainDispatch } from '@redux/hooks';
import { useActivateGame, useEditUserData } from '@data/hooks';
import { getFormattedSearchString } from '@utils/hooks';
import { allGameData } from '@utils/configs/game-configs';
import { useState } from 'react';
import { GameKeyEnum } from '@utils/index';
import { useTranslation } from 'react-i18next';
import { useLoginDispatch, useLoginState } from '@features/login/provider';

export const useSelectFirstGame = () => {
  const { t } = useTranslation();
  const [selectedFirstGame, setSelectedFirstGame] = useState<GameKeyEnum>();
  const [searchValue, setSearchValue] = useState('');
  const { user } = useMainState();
  const { setSelectedGameSettings } = useMainDispatch();
  const { isGoogleSignIn } = useLoginState();
  const { setIsGoogleSignIn } = useLoginDispatch();
  const isRequestLoading = useIsRequestLoading();
  const { updateUserData } = useEditUserData();
  const { activateGame } = useActivateGame();
  const filteredGames = filterGameList(
    allGameData,
    getFormattedSearchString(searchValue),
    t,
  );

  return {
    viewModel: {
      user,
      searchValue,
      selectedFirstGame,
      filteredGames,
      isLoading: isRequestLoading,
      isGoogleSignIn,
    },
    actions: {
      setSearchValue,
      setSelectedFirstGame,
      updateUserData,
      activateGame,
      setIsGoogleSignIn,
      setSelectedGameSettings,
    },
  };
};
