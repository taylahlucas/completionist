import { useMutation } from '@apollo/client';
import { DocumentNode } from 'graphql';
import { MutationHookOptions, MutationTuple } from '@apollo/client/react/types/types';
import { ApolloCache, DefaultContext, OperationVariables } from '@apollo/client/core';

const useGraphQLMutation = <
  TData = any,
  TVariables = OperationVariables,
  TContext = DefaultContext,
  TCache extends ApolloCache<any> = ApolloCache<any>
>(
  mutation: DocumentNode,
  options?: MutationHookOptions<TData, TVariables, TContext, TCache>
): MutationTuple<TData, TVariables, TContext, TCache> => {
  return useMutation(mutation, options);
};

export default useGraphQLMutation;
