import useMainState from '@redux/hooks/useMainState';

interface CheckLocationCompleteReturnType {
  checkMiscItemComplete: (id: string) => boolean;
}

const useCheckMiscItemComplete = (): CheckLocationCompleteReturnType => {
  const { user } = useMainState();

  const checkMiscItemComplete = (id: string): boolean => {
    return !!user.data.skyrim.miscellaneous.find(item => item.id === id)
  };

  return { checkMiscItemComplete }
}

export default useCheckMiscItemComplete;