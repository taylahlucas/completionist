import { NetworkStatus, ApolloClient, ApolloError, InMemoryCache } from '@apollo/client';
import { MutationHookOptions } from '@apollo/client/react/types/types';
import { ApolloCache, DefaultContext, OperationVariables } from '@apollo/client/core';

export type GraphQLClient<T> = ApolloClient<T>;
export enum GraphQLNetworkStatus {
  loading = NetworkStatus.loading,
  setVariables = NetworkStatus.setVariables,
  fetchMore = NetworkStatus.fetchMore,
  refetch = NetworkStatus.refetch,
  poll = NetworkStatus.poll,
  ready = NetworkStatus.ready,
  error = NetworkStatus.error
}
export type GraphQLError = ApolloError;
export type GraphQLCache = InMemoryCache;
export type GraphQLMutationOptions<
  TData = any,
  TVariables = OperationVariables,
  TContext = DefaultContext,
  TCache extends ApolloCache<any> = ApolloCache<any>
> = MutationHookOptions<TData, TVariables, TContext, TCache>;
