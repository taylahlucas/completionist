import useMainState from '@redux/hooks/useMainState';

interface CheckLocationCompleteReturnType {
  checkLocationComplete: (id: string) => boolean;
}

const useCheckLocationComplete = (): CheckLocationCompleteReturnType => {
  const { user } = useMainState();

  const checkLocationComplete = (id: string): boolean => {
    return !!user.data?.skyrim.locations.find(item => item.id === id && item.isComplete);
  };

  return { checkLocationComplete }
}

export default useCheckLocationComplete;