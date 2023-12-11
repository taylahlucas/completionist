import graphql from '@graphql/graphql';
import useGraphQLQuery from '@graphql/hooks/useGraphQLQuery';
import useMainState from '@redux/hooks/useMainState';
import { useEffect } from 'react';
import { User } from '@utils/CustomInterfaces';

interface GetUserByIdQuery {
  loading?: boolean;
  data: User;
}

export const getUserById = graphql`
  query getUserById($userId: String!) {
    getUserById(userId: $userId) {
      user {
        id
        userId
        name
        email
        userAvatar
        subscription
        data {
          skyrim {
            quests {
              id
              isComplete
            }
            collectables {
              id
              isComplete
            }
            books {
              id
              isComplete
            }
            locations {
              id
              isComplete
            }
          }
        }
      }
    }
  }
`;

const useGetUserById = (): GetUserByIdQuery => {
  const { userFormData, webSignInConfigured } = useMainState();

  const { loading, error, data } = useGraphQLQuery(getUserById, {
    skip: !userFormData.userId || !webSignInConfigured,
    variables: {
      userId: userFormData.userId
    }
  });
  
  useEffect(() => {
    if (error) {
      console.log("useGetUserById ERROR: ", error)
    }
  }, [])

  return { loading, data };
};

export default useGetUserById;