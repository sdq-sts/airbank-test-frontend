import gql from 'graphql-tag';

export const FETCH_TRANSACTIONS_QUERY = gql`
  query Query($search: String, $bank: String, $account: String, $startDate: String, $endDate: String, $cursor: String, $perPage: Int) {
    transactions(search: $search, bank: $bank, account: $account, startDate: $startDate, endDate: $endDate, cursor: $cursor, perPage: $perPage) {
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
