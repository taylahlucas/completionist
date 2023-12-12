import useMainState from '@redux/hooks/useMainState';

interface CheckBookCompleteProps {
  id: string;
}

interface CheckLocationCompleteReturnType {
  checkBookComplete: ({ id }: CheckBookCompleteProps) => boolean;
}

const useCheckBookComplete = (): CheckLocationCompleteReturnType => {
  const { completedMiscItems } = useMainState();

  const checkBookComplete = ({ id }: CheckBookCompleteProps): boolean => {
    return !!completedMiscItems.find(bookId => bookId === id)
  };

  return { checkBookComplete }
}

export default useCheckBookComplete;