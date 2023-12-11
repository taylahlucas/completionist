import React from 'react';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { Base } from '@utils/CustomInterfaces';
import config from '@utils/config';

const ApolloClientContainer: React.FunctionComponent<Base> = ({ children }) => {
  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
  });
  // TODO: Fix here, not authenticated
  // console.log("FE graphQLEndpoint: ", config.graphQLEndpoint)
  // const httpLink = createHttpLink({
  //   // uri: config.graphQLEndpoint
  //   // uri: "http://localhost:4002/graphql"
  //   uri: "https://us-east-1.aws.realm.mongodb.com/api/client/v2.0/app/application-0-qzybh/graphql"
  // });
  
  // const authLink = setContext((_, { headers }) => {
  //   const token = config.accessToken;
  //   console.log("FE ACCESS TOKEN: ", config.accessToken)
  //   return {
  //     headers: {
  //       ...headers,
  //       authorization: token ? `Bearer ${token}` : '',
  //     },
  //   };
  // });
  
  // const client = new ApolloClient({
  //   link: authLink.concat(httpLink),
  //   cache: new InMemoryCache(),
  // });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientContainer;
