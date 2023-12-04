import { Dispatch } from 'redux';
import { setSearchValue } from '../MainState.native';
import { useAppDispatch } from '../store.native';

interface MainDispatch {
  setSearchValue: (value: string) => void;
}

const useMainDispatch = (): MainDispatch => {
  const dispatch: Dispatch = useAppDispatch();

  return {
    setSearchValue(value: string): void {
      dispatch(setSearchValue(value));
    }
  }
}

export default useMainDispatch;
