/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const upload = /* GraphQL */ `
  query Upload($msg: String) {
    upload(msg: $msg)
  }
`;
export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      status
      priority
      owner
      admins
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        status
        priority
        owner
        admins
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
