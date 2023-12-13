import { mappedMiscItems } from '@data/functions';

const useGetMiscItemCategories = (): string[] => {
  let miscItemCategories: string[] = [];
  mappedMiscItems.map(miscItem => {
    if (!miscItemCategories.find(item => item === miscItem.type)) {
      miscItemCategories.push(miscItem.type);
    }
  });
  return miscItemCategories;
};

export default useGetMiscItemCategories;