import useMainState from '@redux/hooks/useMainState';

interface UserData {
  data: SkyrimData
}

interface SkyrimData {
  skyrim: GeneralData
}

interface GeneralData {
  quests: Item[],
  collectables: Item[]
  miscellaneous: Item[]
  locations: Item[]
}

interface Item {
  id: string;
  isCompleted: boolean;
}

const useUploadData = () => {
  const {
    completedQuests,
    completedCollectableIds,
    completedMiscItems,
    completedLocations
  } = useMainState();

  const uploadData = async () => {
    // TODO: Upload data
    // const objects = userData;
  };

  return { uploadData };
};

export default useUploadData;