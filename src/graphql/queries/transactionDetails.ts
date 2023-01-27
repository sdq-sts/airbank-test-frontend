import gql from 'graphql-tag';

export const FETCH_TRANSACTION_DETAILS_QUERY = gql`
  query Transaction($transactionId: String!) {
    transaction(id: $transactionId) {
      id
      reference
      currency
      amount
      account {
        id
        name
        bank
        created_at
        updated_at
      }
      category {
        id
        name
        color
        created_at
        updated_at
      }
      created_at
      updated_at
    }
  }
`;
