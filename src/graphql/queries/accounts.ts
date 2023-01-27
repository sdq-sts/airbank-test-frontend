import gql from 'graphql-tag';

export const FETCH_ACCOUNTS_QUERY = gql`
  query Accounts {
    accounts {
      id
      name
      bank
    }
  }
`;
