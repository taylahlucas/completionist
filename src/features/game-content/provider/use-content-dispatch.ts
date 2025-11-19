import { Dispatch } from 'redux';
import {
  setSelectedSection,
  setSearchValue,
  setSelectedCategory,
  setWebViewHref,
  setGameContent,
  setSelectedGameData,
} from './content-state';
import { useAppDispatch } from '@redux/store';
import {
  ContentSectionEnum,
  DropDownType,
  GameContentState,
  GameData,
} from '@utils/index';

interface ContentDispatch {
  setSelectedSection: (type: ContentSectionEnum) => void;
  setSelectedGameData: (gameData: GameData) => void;
  setSearchValue: (value: string) => void;
  setSelectedCategory: (category: DropDownType) => void;
  setWebViewHref: (value?: string) => void;
  setGameContent: (value: GameContentState) => void;
}

export const useContentDispatch = (): ContentDispatch => {
  const dispatch: Dispatch = useAppDispatch();

  return {
    setSelectedSection(type: ContentSectionEnum): void {
      dispatch(setSelectedSection(type));
    },
    setSelectedGameData(gameData: GameData): void {
      dispatch(setSelectedGameData(gameData));
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
  };
};
