import { destroy, flow, getParent, types } from "mobx-state-tree";
import { API, graphqlOperation } from "aws-amplify";
import { listTodos } from "../graphql/queries";

export const TodoModel = types
  .model("TodoModel", {
    createdAt: types.string,
    description: types.string,
    id: types.string,
    name : types.string,
    owner : types.string,
    priority: types.string,
    status: types.boolean,
    updatedAt: types.string
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
  })
  .actions((self) => ({
    addNewTodo(todo) {
      self.todos.push(todo);
    },
    setTodos(todos) {
      self.todos = todos;
    },
    fetchTodos: flow(function* () {
      try {
        const todoData = yield API.graphql(graphqlOperation(listTodos));
        const todos = todoData.data.listTodos.items;
        self.setTodos(todos)
      } catch (err) {
        console.log(err);
      }
    }),
    updateItem(item){
      const updatedList = self.todos.map(todo => {
        if(todo.id === item.id){
          return item
        }else{
          return todo
        }
      })
      self.setTodos(updatedList)
    },
    deleteItem(item){
      const removedList = self.todos.filter(todo => todo.id !== item.id)
      self.setTodos(removedList)
    },
    remove(item) {
        destroy(item);
      }
  }))
  .views( self =>({
    completedList(){
      const completed = self.todos.filter(item => item.status === true);
      return completed;
    },
    inProgressList(){
      const inProgress = self.todos.filter(item => item.status === false);
      return inProgress;
    }
  }))
  
