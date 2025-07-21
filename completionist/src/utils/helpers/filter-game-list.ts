import { GameData, GameKeyEnum } from '@utils/index';
import { TFunction } from 'i18next';

export const filterGameList = (
  data: GameData[],
  searchValue: string,
  t: TFunction,
): GameData[] => {
  return data.filter(item =>
    searchValue?.length > 0
      ? t(`common:categories.${item.id as string}.title`)
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase())
      : true,
  );
};

export const filterGameListById = (
  id: GameKeyEnum,
  data: GameData[],
): GameData | undefined => {
  return data.find(item => item.id === id);
};
