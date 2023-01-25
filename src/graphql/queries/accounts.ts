import gql from 'graphql-tag';

export const FETCH_ACCOUNTS_QUERY = gql`
  query Query {
    accounts {
      id
      name
      bank
    }
  }
`;
