import { renderHook } from '@utils/TestLibraryUtils.native';
import useFilterGameList from '../hooks/useFilterGameList.native';
import { userMock } from '@utils/test-helper/mocks';

describe('useFilterGameList', () => {
	afterEach(() => {
    jest.clearAllMocks();
  });

	it('returns the correct data for active games', () => {
		const { result } = renderHook(() => useFilterGameList());
		const filteredData = result.current.filterGameList(userMock.subscription.data, true, '');

		expect(filteredData).toEqual([{ id: 'skyrim', isActive: true }]);
  });

	it('returns the correct data for inactive games', () => {
		const { result } = renderHook(() => useFilterGameList());
		const filteredData = result.current.filterGameList(userMock.subscription.data, false, '');

		expect(filteredData).toEqual([{ id: 'fallout4', isActive: false }])
  });

	it('returns the correct data when search value exists and active', () => {
		const { result } = renderHook(() => useFilterGameList());
		const filteredData = result.current.filterGameList(userMock.subscription.data, true, 'sky');

		expect(filteredData).toEqual([{ id: 'skyrim', isActive: true }]);
	});

	it('returns the correct data when search value exists and inactive', () => {
		const { result } = renderHook(() => useFilterGameList());
		const filteredData = result.current.filterGameList(userMock.subscription.data, false, '4');

		expect(filteredData).toEqual([{ id: 'fallout4', isActive: false }]);
	})
})