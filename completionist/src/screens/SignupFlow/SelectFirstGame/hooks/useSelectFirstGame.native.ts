import { filterGameList } from '@components/custom/GameList/hooks/useFilterGameList.native';
import useLoginDispatch from '@components/custom/LoginForm/provider/useLoginDispatch';
import useLoginState from '@components/custom/LoginForm/provider/useLoginState';
import { useIsRequestLoading } from '@data/api/hooks/useIsRequestLoading.native';
import useMainState from '@redux/hooks/useMainState';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import { useActivateGame, useEditUserData } from '@data/hooks/index';
import { getFormattedSearchString } from '@utils/hooks/index';
import { allGameData } from '@utils/configs/gameConfigs';
import { useState } from 'react';
import { GameKeyEnum } from '@utils/CustomEnums';
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
