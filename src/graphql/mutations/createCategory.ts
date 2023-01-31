import gql from 'graphql-tag';

export const CREATE_CATEGORY_MUTATION = gql`
  mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {
    createCategory(createCategoryInput: $createCategoryInput) {
      id
      name
      color
      created_at
      updated_at
    }
  }
`;
