import useFilterGameList from "@components/custom/GameList/hooks/useFilterGameList.native";
import useLoginDispatch from "@components/custom/LoginForm/provider/useLoginDispatch";
import useLoginState from "@components/custom/LoginForm/provider/useLoginState";
import useIsLoading from "@data/api/hooks/useIsLoading.native";
import useEditUserData from "@data/hooks/useEditUserData.native";
import useMainState from "@redux/hooks/useMainState";
import useActivateGame from "@data/hooks/useActivateGame.native";
import useFormatter from "@utils/hooks/useFormatter";
import { allGameData } from '@utils/configs/gameConfigs';
import { useState } from "react";
import { GameKeyEnum } from "@utils/CustomEnums";

export const useSelectFirstGame = () => {
  const [selectedFirstGame, setSelectedFirstGame] = useState<GameKeyEnum>();
  const [searchValue, setSearchValue] = useState('');
  const { user } = useMainState();
  const { isGoogleSignIn } = useLoginState();
	const { setIsGoogleSignIn } = useLoginDispatch();
  const isLoading = useIsLoading();
  const { getFormattedSearchString } = useFormatter();
  const { updateUserData } = useEditUserData();
  const { activateGame } = useActivateGame();
  const { filterGameList } = useFilterGameList();
  const filteredGames = filterGameList(allGameData, false, getFormattedSearchString(searchValue));
  
  return {
    viewModel: {
      user,
      searchValue,
      selectedFirstGame,
      filteredGames,
      isLoading,
      isGoogleSignIn
    },
    actions: {
      setSearchValue,
      setSelectedFirstGame,
      updateUserData,
      activateGame,
      setIsGoogleSignIn
    }
  }
};