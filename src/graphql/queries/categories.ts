import gql from 'graphql-tag';

export const FETCH_CATEGORIES_QUERY = gql`
  query Categories($search: String) {
    categories(search: $search) {
      id
      name
      color
      created_at
      updated_at
    }
  }
`;
