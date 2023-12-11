import { gql } from '@apollo/client';
import { DocumentNode } from 'graphql';

const graphql = (literals: string | readonly string[], ...args: any[]): DocumentNode => {
  return gql(literals, ...args);
};

export default graphql;
