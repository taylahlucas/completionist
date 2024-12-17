import { renderHook } from '@utils/testing/TestLibraryUtils.native';
import useFormatter from '@utils/hooks/useFormatter';

describe('useFormatter', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('capitalizes strings correctly', () => {
    const { result } = renderHook(() => useFormatter());

    expect(result.current.capitalize('test string')).toEqual('Test String');
    expect(result.current.capitalize('test second string')).toEqual(
      'Test Second String',
    );
    expect(result.current.capitalize('test1234')).toEqual('Test1234');
    expect(result.current.capitalize('Test string')).toEqual('Test String');
    expect(result.current.capitalize('test String')).toEqual('Test String');
  });
});
