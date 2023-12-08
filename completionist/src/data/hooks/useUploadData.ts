import useMainState from '@redux/hooks/useMainState';
import userData from './userData.json';

// const filePath = './userData.json';
// const fs = require('fs');
// https://www.mongodb.com/docs/atlas/app-services/graphql/
interface UserData {
  data: SkyrimData
}

interface SkyrimData {
  skyrim: GeneralData
}

interface GeneralData {
  quests: Item[],
  collectables: Item[]
  books: Item[]
  locations: Item[]
}

interface Item {
  id: string;
  isCompleted: boolean;
}

const useUploadData = () => {
  const {
    completedQuestIds,
    completedCollectableIds,
    completedBookIds,
    completedLocationIds
  } = useMainState();

  const uploadData = async () => {
    // TODO: Upload data
    // const objects = userData;
  };

  return { uploadData };
};

export default useUploadData;