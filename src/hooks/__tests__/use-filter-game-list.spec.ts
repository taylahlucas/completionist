import { mockEldenRingGameData, mockSkyrimGameData } from '@utils/testing';
import { renderHook } from '@testing-library/react-native';
import { useFilterGameList } from '../use-filter-game-list';
import { GameKey } from '@api/';

describe('useFilterGameList', () => {
  describe('filterGameList', () => {
    it('returns all game list when no search value is provided', () => {
      const { result } = renderHook(() => useFilterGameList());

      const gameData = result.current.filterGameList(
        [mockEldenRingGameData, mockSkyrimGameData],
        '',
      );

      expect(gameData.length).toBe(2);
      expect(gameData[0].id).toBe(mockEldenRingGameData.id);
      expect(gameData[1].id).toBe(mockSkyrimGameData.id);
    });

    it('returns the filtered game list when a search value is provided', () => {
      const { result } = renderHook(() => useFilterGameList());

      const gameData = result.current.filterGameList(
        [mockEldenRingGameData, mockSkyrimGameData],
        'sky',
      );

      expect(gameData.length).toBe(1);
      expect(gameData[0].id).toBe(mockSkyrimGameData.id);
    });

    it('returns an empty array when no matching games are found', () => {
      const { result } = renderHook(() => useFilterGameList());

      const gameData = result.current.filterGameList(
        [mockEldenRingGameData, mockSkyrimGameData],
        'abc',
      );

      expect(gameData.length).toBe(0);
    });
  });

  describe('filterGameListById', () => {
    it('returns the correct item by id', () => {
      const { result } = renderHook(() => useFilterGameList());

      const gameData = result.current.filterGameListById(GameKey.eldenRing, [
        mockEldenRingGameData,
        mockSkyrimGameData,
      ]);
      expect(gameData?.id).toBe(mockEldenRingGameData.id);
    });

    it('returns undefined if id not found', () => {
      const { result } = renderHook(() => useFilterGameList());

      const gameData = result.current.filterGameListById(GameKey.fallout4, [
        mockEldenRingGameData,
        mockSkyrimGameData,
      ]);
      expect(gameData).toBe(undefined);
    });
  });
});
