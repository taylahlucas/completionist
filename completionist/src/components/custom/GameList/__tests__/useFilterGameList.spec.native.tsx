import { renderHook } from '@utils/TestLibraryUtils.native';
import useFilterGameList from '../hooks/useFilterGameList.native';
import { userMockInitial } from '@utils/test-helper/__mocks__/mocks';

describe('useFilterGameList', () => {
	afterEach(() => {
    jest.clearAllMocks();
  });

	it('returns the correct data for active games', () => {
		const { result } = renderHook(() => useFilterGameList());
		const filteredData = result.current.filterGameList(userMockInitial.subscription.data, true, '');

		expect(filteredData).toEqual([{ id: 'fallout4', isActive: true }, { id: 'skyrim', isActive: true }]);
  });

	it('returns the correct data for inactive games', () => {
		const { result } = renderHook(() => useFilterGameList());
		const filteredData = result.current.filterGameList(userMockInitial.subscription.data, false, '');

		expect(filteredData).toEqual([{ id: 'fallout3', isActive: false }, { id: 'witcher3', isActive: false }])
  });

	it('returns the correct data when search value exists and active', () => {
		const { result } = renderHook(() => useFilterGameList());
		const filteredData = result.current.filterGameList(userMockInitial.subscription.data, true, 'sky');

		expect(filteredData).toEqual([{ id: 'skyrim', isActive: true }]);
	});

	it('returns the correct data when search value exists and inactive', () => {
		const { result } = renderHook(() => useFilterGameList());
		const filteredData = result.current.filterGameList(userMockInitial.subscription.data, false, 'fall');

		expect(filteredData).toEqual([{ id: 'fallout3', isActive: false }]);
	})
})