/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($owner: String!) {
    onCreateTodo(owner: $owner) {
      id
      name
      description
      status
      priority
      owner
      editors
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($owner: String!) {
    onUpdateTodo(owner: $owner) {
      id
      name
      description
      status
      priority
      owner
      editors
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($owner: String!) {
    onDeleteTodo(owner: $owner) {
      id
      name
      description
      status
      priority
      owner
      editors
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
