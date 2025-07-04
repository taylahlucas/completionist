import { filterGameList } from '@components/custom/game-list/hooks';
import { useLoginDispatch } from '@components/custom/login-form/provider';
import { useLoginState } from '@components/custom/login-form/provider';
import { useIsRequestLoading } from '@data/api/hooks';
import { useMainState, useMainDispatch } from '@redux/hooks';
import { useActivateGame, useEditUserData } from '@data/hooks';
import { getFormattedSearchString } from '@utils/hooks';
import { allGameData } from '@utils/configs/game-configs';
import { useState } from 'react';
import { GameKeyEnum } from '@utils/index';
import { useTranslation } from 'react-i18next';

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
    false,
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
