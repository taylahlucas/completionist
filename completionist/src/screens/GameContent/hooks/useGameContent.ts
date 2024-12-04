import {useGetGameData, useGetUserGameData} from "@data/hooks/index";
import useMainState from '@redux/hooks/useMainState';
import useContentState from '@components/custom/ContentList/provider/useContentState';
import useContentDispatch from '@components/custom/ContentList/provider/useContentDispatch';
import {ContentSectionEnum} from '@utils/CustomEnums';

const useGameContent = () => {
  const {selectedGame} = useMainState();
  const {setSearchValue} = useContentDispatch();
  const {searchValue} = useContentState();
  const {userQuests, userCollectables, userLocations, userMiscItems} =
    useGetUserGameData();
  const {mapDataTo} = useGetGameData(selectedGame);

  return {
    viewModel: {
      selectedGame,
      searchValue,
      quests: {
        completed: userQuests.length,
        total: mapDataTo(ContentSectionEnum.QUESTS, selectedGame?.id, true)
          .length,
      },
      collectables: {
        completed: userCollectables.length,
        total: mapDataTo(
          ContentSectionEnum.COLLECTABLES,
          selectedGame?.id,
          true,
        ).length,
      },
      locations: {
        completed: userLocations.length,
        total: mapDataTo(ContentSectionEnum.LOCATIONS, selectedGame?.id, true)
          .length,
      },
      misc: {
        completed: userMiscItems.length,
        total: mapDataTo(
          ContentSectionEnum.MISCELLANEOUS,
          selectedGame?.id,
          true,
        ).length,
      },
    },
    actions: {
      setSearchValue,
      mapDataTo,
    },
  };
};

export default useGameContent;
