import { renderHook } from '@utils/testing/test-library-utils';
import { initialState as mainState } from '@redux/main-state';
import useGetContent from '../hooks/use-get-content';
import { ContentSectionEnum, GameKeyEnum } from '@utils/custom-enums';

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
