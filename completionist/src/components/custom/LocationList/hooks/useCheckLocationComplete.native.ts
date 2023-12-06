import useMainState from '@redux/hooks/useMainState';

interface CheckLocationCompleteProps {
  id: string;
}

interface CheckLocationCompleteReturnType {
  checkLocationComplete: ({ id }: CheckLocationCompleteProps) => boolean;
}

const useCheckLocationComplete = (): CheckLocationCompleteReturnType => {
  const { completedLocationIds } = useMainState();

  const checkLocationComplete = ({ id }: CheckLocationCompleteProps): boolean => {
    return !!completedLocationIds.find(locationId => locationId === id)
  };

  return { checkLocationComplete }
}

export default useCheckLocationComplete;