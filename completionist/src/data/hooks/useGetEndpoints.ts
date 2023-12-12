import axios from 'axios';
import { UserFormData } from '@utils/CustomInterfaces';

interface GetUserByIdProps {
  userId: string;
}

interface CreateUserProps {
  data: UserFormData;
}

const useGetEndpoints = () => {
  const getUserById = async ({ userId }: GetUserByIdProps) => {
    try {
      console.log("USER ID: ", userId)
      await axios.get(`http://localhost:4000/users/${userId}`)
        .then(response => {
          console.log("RESPONSE: ", response.data);
          // Store user in cache
          return response.data;
        })
        .catch(error => {
          console.log("Error getUserById: ", error);
        })
    }
    catch (error) {
      console.log("Error getUserById: ", error);
    }
  };
  // const createUser = ({ data }) => {};
  return { getUserById }; 
};

export default useGetEndpoints;