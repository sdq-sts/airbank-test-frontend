import gql from 'graphql-tag';

export const UPDATE_TRANSACTION_MUTATION = gql`
  mutation UpdateTransaction($updateTransactionInput: UpdateTransactionInput!) {
    updateTransaction(updateTransactionInput: $updateTransactionInput) {
      id
      category {
        id
        name
        color
        created_at
        updated_at
      }
    }
  }
`;
