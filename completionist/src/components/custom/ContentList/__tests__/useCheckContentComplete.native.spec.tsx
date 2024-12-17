import { renderHook } from '@utils/testing/TestLibraryUtils.native';
import { initialState as mainState } from '@redux/MainState';
import useCheckContentComplete from '../hooks/useCheckContentComplete';
import { ContentSectionEnum, GameKeyEnum } from '@utils/CustomEnums';
import useGetContent from '../hooks/useGetContent';

describe('useCheckContentComplete', () => {
  const initialState = {
    main: {
      ...mainState,
      selectedGame: GameKeyEnum.SKYRIM,
      selectedGameData: {
        quests: [],
      },
    },
    content: {
      sectionType: ContentSectionEnum.QUESTS,
      searchValue: '',
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('checkContentComplete returns the correct content for incomplete', () => {
    const { result } = renderHook(
      () => useCheckContentComplete(),
      initialState,
    );
    const data = result.current.checkContentComplete(
      'c0c4db32-0e1a-4f9c-9707-6e510646237f',
    );

    expect(data).toEqual(false);
  });

  it('checkContentComplete returns the correct content for complete', () => {
    const updatedInitialState = {
      ...initialState,
      main: {
        ...initialState.main,
        selectedGameData: {
          quests: [
            {
              id: 'c0c4db32-0e1a-4f9c-9707-6e510646237f',
              isComplete: true,
            },
          ],
        },
      },
    };
    const { result } = renderHook(
      () => useCheckContentComplete(),
      updatedInitialState,
    );
    const data = result.current.checkContentComplete(
      'c0c4db32-0e1a-4f9c-9707-6e510646237f',
    );

    expect(data).toEqual(true);
  });

  it('checkContentCompleteForCategory returns the correct content for complete', () => {
    const updatedInitialState = {
      ...initialState,
      main: {
        ...initialState.main,
        selectedGameData: {
          quests: [
            {
              id: 'c0c4db32-0e1a-4f9c-9707-6e510646237f',
              isComplete: true,
            },
          ],
        },
      },
      content: {
        sectionType: ContentSectionEnum.QUESTS,
        searchValue: '',
      },
    };
    const { result } = renderHook(
      () => useCheckContentComplete(),
      updatedInitialState,
    );
    const { result: itemsResult } = renderHook(
      () => useGetContent(),
      updatedInitialState,
    );
    const itemData = itemsResult.current.getContentForCategory('Main Quests');
    const data = result.current.checkContentCompleteForCategory(itemData);

    expect(data).toEqual(1);
  });
});
