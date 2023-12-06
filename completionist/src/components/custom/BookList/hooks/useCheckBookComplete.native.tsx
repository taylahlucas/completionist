import useMainState from '@redux/hooks/useMainState';

interface CheckBookCompleteProps {
  id: string;
}

interface CheckLocationCompleteReturnType {
  checkBookComplete: ({ id }: CheckBookCompleteProps) => boolean;
}

const useCheckBookComplete = (): CheckLocationCompleteReturnType => {
  const { completedBookIds } = useMainState();

  const checkBookComplete = ({ id }: CheckBookCompleteProps): boolean => {
    return !!completedBookIds.find(bookId => bookId === id)
  };

  return { checkBookComplete }
}

export default useCheckBookComplete;