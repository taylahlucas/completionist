import { renderHook } from '@utils/testing/TestLibraryUtils.native';
import { initialState as mainState } from '@redux/MainState';
import useGetContent from '../hooks/useGetContent';
import { ContentSectionEnum, GameKeyEnum } from '@utils/CustomEnums';

describe('useGetContent', () => {
  const initialState = {
    main: {
      ...mainState,
      selectedGame: GameKeyEnum.SKYRIM,
    },
    content: {
      sectionType: ContentSectionEnum.QUESTS,
      searchValue: '',
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getFilteredContent returns the correct content without search value', () => {
    const { result } = renderHook(() => useGetContent(), initialState);
    const data = result.current.getFilteredContent();

    expect(data.length).toEqual(512);
  });

  it('getFilteredContent returns the correct content with search value', () => {
    const updatedInitialState = {
      ...initialState,
      content: {
        sectionType: ContentSectionEnum.QUESTS,
        searchValue: 'Un',
      },
    };
    const { result } = renderHook(() => useGetContent(), updatedInitialState);
    const data = result.current.getFilteredContent();

    expect(data.length).toEqual(50);
  });

  it('getContentForCategory returns the correct content', () => {
    const { result } = renderHook(() => useGetContent(), initialState);
    const data = result.current.getContentForCategory('Main Quests');

    expect(data.length).toEqual(20);
  });

  it('getContentForSubCategory returns the correct content', () => {
    const { result } = renderHook(() => useGetContent(), initialState);
    const data = result.current.getContentForSubCategory(
      'Main Quests',
      'Act I',
    );

    expect(data.length).toEqual(6);
  });

  it('getContentForCategoryType returns the correct content', () => {
    const { result } = renderHook(() => useGetContent(), initialState);
    const data = result.current.getContentForSubCategoryType(
      'Windhelm',
      'Side Quests',
    );

    expect(data.length).toEqual(4);
  });
});
