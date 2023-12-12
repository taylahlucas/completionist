import useMainState from '@redux/hooks/useMainState';

interface CheckLocationCompleteProps {
  id: string;
}

interface CheckLocationCompleteReturnType {
  checkLocationComplete: ({ id }: CheckLocationCompleteProps) => boolean;
}

const useCheckLocationComplete = (): CheckLocationCompleteReturnType => {
  const { completedLocations } = useMainState();

  const checkLocationComplete = ({ id }: CheckLocationCompleteProps): boolean => {
    return !!completedLocations.find(locationId => locationId === id)
  };

  return { checkLocationComplete }
}

export default useCheckLocationComplete;