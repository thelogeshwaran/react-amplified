import { destroy, flow, getParent, types } from "mobx-state-tree";
import { DataStore, Predicates } from "@aws-amplify/datastore"
import { listTodos, syncTodos } from "../graphql/queries";
import {
  CognitoIdentityProviderClient,
  ListUsersCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { Todo } from "../models";


export const TodoModel = types
  .model("TodoModel", {
    description: types.string,
    id: types.string,
    name: types.string,
    owner: types.string,
    priority: types.string,
    status: types.boolean,
    editors : types.array(types.string),
  })
  .actions((self) => ({
    updatePriority(priority) {
      self.priority = priority;
    },
    updateStatus(status) {
      self.status = status;
    },
    updateTodo(todo) {
      self.name = todo.name;
      self.description = todo.description;
    },
    removeTodo() {
      getParent(self, 2).remove(self);
    },
  }));

export const TodoStore = types
  .model("TodoStore", {
    todos: types.array(TodoModel),
    sharedTodos: types.array(TodoModel),
    users: types.array(types.string),
  })
  .actions((self) => ({
    addNewTodo(todo) {
      self.todos.push(todo);
    },
    setTodos(todos) {
      self.todos = todos;
    },
    setSharedTodos(items) {
      self.sharedTodos = items;
    },
    setUsers(users) {
      self.users = users;
    },
    fetchTodos: flow(function* (name) {
      try {
        // const todoDatas = yield API.graphql(
        //   graphqlOperation(listTodos)
        // );
        // console.log(todoDatas)
        // const todos = todoData.data.listTodos.items;
        const todoData = yield DataStore.query(Todo,Predicates.ALL)
        console.log(todoData)
        const data = todoData.map( item => ({...item}))
        console.log(data)
        self.setTodos( data);
      } catch (err) {
        console.log(err);
      }
    }),
    fetchUsers: flow(function* (user) {
      const client = new CognitoIdentityProviderClient({
        region: "ap-southeast-1",
        credentials: {
          accessKeyId: process.env.REACT_APP_ACCESS_KEY,
          secretAccessKey: process.env.REACT_APP_SECRET_KEY,
        },
      });
      const command = new ListUsersCommand({
        UserPoolId: process.env.REACT_APP_USERPOOL_ID,
      });
      try {
        const { Users } = yield client.send(command);
        let data = [];
        Users.forEach((item) => {
          if (item.Username !== user.username) {
            data.push(item.Username);
          }
        });
        self.setUsers(data);
      } catch (error) {
        console.error(error);
      }
    }),

    updateItem(item) {
      let itemIncludedList = false;
      const updatedList = self.todos.map((todo) => {
        if (todo.id === item.id) {
          itemIncludedList = true;
          return item;
        } else {
          return todo;
        }
      });
      if (itemIncludedList) {
        self.setTodos(updatedList);
      } else  {
        self.sharedTodos.push(item);
      }
      
    },
    updateSharedItem(item, user) {
      let itemIncluded = false;
      if (item.admins.includes(user.username)){
        const updatedList = self.sharedTodos.map((todo) => {
          if (todo.id === item.id) {
            itemIncluded = true;
            return item;
          } else {
            return todo;
          }
        });
        if (itemIncluded) {
          self.setSharedTodos(updatedList);
        } else  {
          self.addNewTodo(item);
        }
      }
    },
    deleteItem(item) {
      const removedList = self.todos.filter((todo) => todo.id !== item.id);
      self.setTodos(removedList);
    },
    deleteSharedItem(item) {
      const removedList = self.sharedTodos.filter(
        (todo) => todo.id !== item.id
      );
      self.setSharedTodos(removedList);
    },
    remove(item) {
      destroy(item);
    },
  }))
  .views((self) => ({
    completedList() {
      const completed = self.todos.filter((item) => item.status === true);
      return completed;
    },
    inProgressList() {
      const inProgress = self.todos.filter((item) => item.status === false);
      return inProgress;
    },
    completedSharedList() {
      const completed = self.sharedTodos.filter((item) => item.status === true);
      return completed;
    },
    inProgressSharedList() {
      const inProgress = self.sharedTodos.filter(
        (item) => item.status === false
      );
      return inProgress;
    },
  }));
