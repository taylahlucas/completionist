import { useEffect } from 'react';
import axios from 'axios';
import useMainState from '@redux/hooks/useMainState';
import useMainDispatch from '@redux/hooks/useMainDispatch';
import useGetEndpoints from '@data/hooks/useGetEndpoints';

const useCreateOrGetUser = () => {
  const { setLoggedIn } = useMainDispatch();
  const { userFormData, loggedIn } = useMainState();
  const { getUserById } = useGetEndpoints();

  const handleSubmit = async () => {
    console.log("HandleSubmit: ", loggedIn)
    // TODO: Move to createUser api
    if (!!userFormData.userId && !loggedIn) {
      try {
        await axios.post('http://localhost:4000/api/signin',
          {
            userId: userFormData.userId,
            name: userFormData.name,
            email: userFormData.email,
            userAvatar: userFormData.userAvatar,
            subscription: userFormData.subscription,
            data: {
              skyrim: {
                quests: [],
                collectables: [],
                misc: [],
                locations: []
              }
            }
          }
        ).then(response => {
          console.log("RESPONSE: ", response.data);
          setLoggedIn(true);
        })
        .catch(error => {
          console.log("Error createUser: ", error);
        })
      }
      catch (error) {
        console.log("Error createUser: ", error)
      }
    }
  };

  useEffect(() => {
    if (!!userFormData.userId) {
      const user = getUserById({ userId: userFormData.userId });

      if (!user) {
        handleSubmit();
      }
      else {
        setLoggedIn(true);
      }
    }
  }, [userFormData])
};

export default useCreateOrGetUser;