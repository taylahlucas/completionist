import { gql } from '@apollo/client';
import useCreateUserMutationOptions from './useCreateUserMutationOptions';
import useGraphQLMutation from '@graphql/hooks/useGraphQLMutation';
import useMainState from '@redux/hooks/useMainState';
import graphql from '@graphql/graphql';

interface CreateUserMutation {
  createUser: () => Promise<void>;
  isCreatingUser: boolean;
}

export const createUser = graphql`
  mutation createUser(
    $userId: String!, 
    $name: String!, 
    $email: String!, 
    $userAvatar: String,
    $subscription: [Subscription]!, 
    $data: [UserData]!
  ) {
    createUser(
      userId: $userId,
      name: $name, 
      email: $email, 
      userAvatar: $userAvatar,
      subscription: $subscription, 
      data: $data
    ) {
      user {
        _id
        userId
        name
        email
        subscription
        userAvatar
        data {
          skyrim {
            quests
            collectables
            books
            locations
          }
        }
      }
    }
  }

`;

const useCreateUserMutation = (): CreateUserMutation => {
  const { onCompleted, onError } = useCreateUserMutationOptions();
  const [createUserMutation, { loading }] = useGraphQLMutation(createUser, {
    onCompleted,
    onError
  });
  const { userFormData } = useMainState();
  

  return {
    createUser: async (): Promise<void> => {
      console.log("CREATING USER");
      console.log("\n");
      await createUserMutation({
        variables: {
          userId: userFormData.userId,
          name: userFormData.name,
          email: userFormData.email,
          userAvatar: userFormData.userAvatar,
          subscription: userFormData.subscription,
          data: {
            skyrim: {
              quests: [],
              collectables: [],
              books: [],
              locations: []
            }
          }
        }
      })
    },
    isCreatingUser: loading
  }
};

export default useCreateUserMutation;