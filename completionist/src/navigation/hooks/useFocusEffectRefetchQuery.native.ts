import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

/**
 * Hook to refetch a query when the screen is on focused.
 * This can be used to make sure the screen gets the latest data from the server
 * when the user go back to the screen again.
 */
// TODO: Test if this works for reloading page / open / close
const useFocusEffectRefetchQuery = (refetch: () => void, actionBeforeRefetch?: () => void): void => {
  useFocusEffect(
    useCallback(() => {
      if (actionBeforeRefetch) actionBeforeRefetch();

      refetch();
    }, [refetch])
  );
};

export default useFocusEffectRefetchQuery;
