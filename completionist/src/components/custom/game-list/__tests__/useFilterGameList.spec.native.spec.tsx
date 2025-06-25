import { renderHook } from '@utils/testing/TestLibraryUtils.native';
import useFilterGameList from '../hooks/use-filter-game-list';
import { userLoggedInMock } from '@utils/testing/test-helper/__mocks__/mocks';

// TODO: Fix tests
describe('useFilterGameList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns the correct data for active games', () => {
    const { result } = renderHook(() => useFilterGameList());
    // TODO: Replace with activeGames
    const filteredData = result.current.filterGameList([], true, '');

    expect(filteredData).toEqual([
      { id: 'fallout4', isActive: true },
      { id: 'skyrim', isActive: true },
    ]);
  });

  it('returns the correct data for inactive games', () => {
    const { result } = renderHook(() => useFilterGameList());
    // TODO: Replace with activeGames
    const filteredData = result.current.filterGameList([], false, '');

    expect(filteredData).toEqual([
      { id: 'fallout3', isActive: false },
      { id: 'witcher3', isActive: false },
    ]);
  });

  it('returns the correct data when search value exists and active', () => {
    const { result } = renderHook(() => useFilterGameList());
    // TODO: Replace with activeGames
    const filteredData = result.current.filterGameList([], true, 'sky');

    expect(filteredData).toEqual([{ id: 'skyrim', isActive: true }]);
  });

  it('returns the correct data when search value exists and inactive', () => {
    const { result } = renderHook(() => useFilterGameList());
    // TODO: Replace with activeGames
    const filteredData = result.current.filterGameList([], false, 'fall');

    expect(filteredData).toEqual([{ id: 'fallout3', isActive: false }]);
  });
});
