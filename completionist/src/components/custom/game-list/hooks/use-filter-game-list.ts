import { GameData } from '@utils/index';
import { TFunction } from 'i18next';

export const filterGameList = (
  data: GameData[],
  isActive: boolean,
  searchValue: string,
  t: TFunction,
) => {
  return data.filter(item =>
    searchValue?.length > 0
      ? t(`common:categories.${item.id as string}.title`)
          .toLocaleLowerCase()
          .includes(searchValue.toLocaleLowerCase())
      : true,
  );
};
