import { authEndpoints, CredentialsExistProps } from '@data/api';
import { useQuery } from '@tanstack/react-query';

// export const checkUserExists = async ({
//   queryKey,
// }: QueryFunctionContext<readonly ['user', string]>) => {
//   const [, email] = queryKey;

//   return authEndpoints.checkUserExists(email);
// };

export const useCheckUserExists = (email: string, enabled?: boolean) => {
  return useQuery<CredentialsExistProps, Error>({
    queryKey: ['user', email] as const,
    queryFn: () => authEndpoints.checkUserExists(email),
    enabled,
  });
};
