import gql from 'graphql-tag';

export const FETCH_TRANSACTIONS_QUERY = gql`
  query Transactions($cursor: String) {
    transactions(cursor: $cursor) {
      id
      currency
      created_at
      amount
      reference
      category {
        id
        name
        color
      }
    }
  }
`;
