import { useEffect } from 'react';
import axios from 'axios';
import useMainState from '@redux/hooks/useMainState';

const useCreateOrGetUser = () => {
  const { userFormData, loggedIn } = useMainState();

  const handleSubmit = async () => {
    console.log("HERE: ", loggedIn)
    if (!!userFormData.userId && !loggedIn) {
      try {
        console.log("Posting api signup")
        await axios.post('http://localhost:4000/api/signup',
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
          console.log("RESPONSE: ", response.data)
        })
      }
      catch (error) {
        console.log("Error posting signup: ", error)
      }
    }
  };

  useEffect(() => {
    console.log("userFormData: ", userFormData)
    console.log("\n")
    if (!!userFormData.userId) {
      handleSubmit();
    }
  }, [userFormData])
};

export default useCreateOrGetUser;