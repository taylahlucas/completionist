import useCreateUserMutation from '@data/hooks/useCreateUserMutation';
import useGetUserById from '@data/hooks/useGetUserByIdQuery';
import useMainState from '@redux/hooks/useMainState';
import { useEffect } from 'react';

const useCreateOrGetUser = () => {
  const { userFormData } = useMainState();
  const { data, loading } = useGetUserById();
  const { createUser, isCreatingUser } = useCreateUserMutation();

  useEffect(() => {
    console.log("userFormData: ", userFormData)
    console.log("\n")
    if (!!data && !!userFormData.userId) {
      console.log("DATA: ", data)
    }
    else if (!!userFormData.userId && !data) {
      createUser();
    }
  }, [userFormData])

  useEffect(() => {
    if (loading) {
      console.log("loading: ", loading)
    }
  }, [loading])
};

export default useCreateOrGetUser;