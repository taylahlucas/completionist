import { gql } from '@apollo/client';
import useCreateUserMutationOptions from './useCreateUserMutationOptions';
import useGraphQLMutation from '@graphql/hooks/useGraphQLMutation';
import useMainState from '@redux/hooks/useMainState';

interface CreateUserMutation {
  createUser: () => Promise<void>;
  isCreatingUser: boolean;
}

export const createUser = gql`
  mutation createUser($name: String!, $email: String, $subscription: [Subscription], data: $[UserData]) {
    createUser(name: $name, email: $email, subscription: $subscription, data: $data) {
      _id
      name
      email
      subscription
      data
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
      await createUserMutation({
        variables: {
          name: userFormData.name,
          email: userFormData.email,
          userAvatar: userFormData.userAvatar,
          subscription: userFormData.subscription,
          data: []
        }
      })
    },
    isCreatingUser: loading
  }
};

export default useCreateUserMutation;