import { GameData, GameKeyEnum } from '@utils/index';
import { useTranslation } from 'react-i18next';

export const useFilterGameList = () => {
  const { t } = useTranslation();

  const filterGameList = (
    data: GameData[],
    searchValue: string,
  ): GameData[] => {
    return data?.filter(item =>
      searchValue?.length > 0
        ? t(`common:categories.${item.id as string}.title`)
            .toLocaleLowerCase()
            .includes(searchValue.toLocaleLowerCase())
        : true,
    );
  };

  const filterGameListById = (
    id: GameKeyEnum,
    data: GameData[],
  ): GameData | undefined => {
    return data?.find(item => item.id === id);
  };

  return {
    filterGameList,
    filterGameListById,
  };
};
