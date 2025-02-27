import { Dispatch } from 'redux';
import {
  setSelectedSection,
  setSearchValue,
  setSelectedCategory,
  setWebViewHref,
  setGameContent,
  reset,
} from './ContentState';
import { useAppDispatch } from '@redux/store';
import { DropDownType, GameContentState } from '@utils/CustomInterfaces';
import { ContentSectionEnum } from '@utils/CustomEnums';

interface ContentDispatch {
  setSelectedSection: (type: ContentSectionEnum) => void;
  setSearchValue: (value: string) => void;
  setSelectedCategory: (category: DropDownType) => void;
  setWebViewHref: (value?: string) => void;
  setGameContent: (value: GameContentState) => void;
  reset: () => void;
}

const useContentDispatch = (): ContentDispatch => {
  const dispatch: Dispatch = useAppDispatch();

  return {
    setSelectedSection(type: ContentSectionEnum): void {
      dispatch(setSelectedSection(type));
    },
    setSearchValue(value: string): void {
      dispatch(setSearchValue(value));
    },
    setSelectedCategory(category: DropDownType): void {
      dispatch(setSelectedCategory(category));
    },
    setWebViewHref(value?: string): void {
      dispatch(setWebViewHref(value));
    },
    setGameContent(value: GameContentState): void {
      dispatch(setGameContent(value));
    },
    reset(): void {
      dispatch(reset());
    },
  };
};

export default useContentDispatch;
