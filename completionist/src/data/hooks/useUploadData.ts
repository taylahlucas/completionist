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

  // const readJsonFile = (filePath: string) => {
  //   try {
  //     const data = fs.readFileSync(filePath, 'utf8');
  //     return JSON.parse(data);
  //   } catch (err) {
  //     console.error('Error reading JSON file:', err);
  //     return [];
  //   }
  // };
  
  // // Write JSON file
  // const writeJsonFile = (filePath: string, data: UserData) => {
  //   try {
  //     fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  //     console.log('File updated successfully!');
  //   } catch (err) {
  //     console.error('Error writing JSON file:', err);
  //   }
  // };
  

  const uploadData = async () => {
    // TODO: Upload data
    // const objects = userData;
    // File
    console.log("HERE: ", userData);
  };

  return { uploadData };
};

export default useUploadData;