import { useQuery } from '@apollo/client';
import { DocumentNode } from 'graphql';
import { QueryHookOptions } from '@apollo/client/react/types/types';
import { GraphQLError, GraphQLNetworkStatus } from '../GraphQLInterfaces';

interface GraphQLQuery<TData = any> {
  data: TData | undefined;
  error?: GraphQLError;
  loading: boolean;
  networkStatus: GraphQLNetworkStatus;
  refetch: () => void;
  startPolling: (pollInterval: number) => void;
  stopPolling: () => void;
}

const useGraphQLQuery = (query: DocumentNode, options?: QueryHookOptions): GraphQLQuery => {
  const result = useQuery(query, options);
  return {
    data: result.data,
    error: result.error,
    loading: result.loading,
    networkStatus: result.networkStatus as number as GraphQLNetworkStatus,
    refetch: result.refetch,
    startPolling: result.startPolling,
    stopPolling: result.stopPolling
  };
};

export default useGraphQLQuery;
