import { GameData, User } from '@utils/custom-interfaces';
import { LanguageType } from '@utils/custom-types';

export const userWithUpdatedGameLanguage = (
  value: string,
  user: User,
  selectedGameData: GameData,
): User => {
  let gameData = Object.entries(user.gameData).find(
    item => item[1].id === selectedGameData.id,
  );
  if (!gameData) return user;

  const updatedGameData: GameData[] = [
    ...user.gameData.filter(item => item.id !== selectedGameData.id),
    {
      ...gameData[1],
      lang: value as LanguageType,
    },
  ];

  return {
    ...user,
    gameData: updatedGameData,
  };
};

// settings: {
//   ...user.settings,
//   lang: value as LanguageType,
// },
