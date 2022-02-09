import React from 'react'
import TodoList from './TodoList';
import Form from './Form';
import axios from 'axios';


const initialState = {
  todos: []
};
const URL = 'http://localhost:9000/api/todos';

export default class App extends React.Component {
 
  state = initialState;

  componentDidMount(){
    axios.get(URL)
    .then(res => {
      console.log(res)
      this.setState({...this.state, 
        todos: res.data.data})
    })
    .catch(err => {
      console.error(err)
    })
  }

  handleAdd = (name) => {

    const newTodo = {
      name: name,
      id: Date.now(),
      completed: false
    };

    this.setState({
      ...this.state,
      todos: [...this.state.todos, newTodo]
    });
  }

  handleClear = () => {
    this.setState({
      ...this.state, 
      todos: this.state.todos.filter(todo => {
        return (todo.completed === false);
      })
    });
  }
  
  handleToggle = (clickedId) => {

    this.setState({
      ...this.state,
      todos: this.state.todos.map(todo => {
        if (todo.id === clickedId) {
          return {
            ...todo,
            completed: !todo.completed
          }
        }
          return todo;
      })
    })
  }
  
  render() {
    const {todos} = this.state;
    
    return (
      <div>
        <h1>Todo App</h1>
        <TodoList handleToggle={this.handleToggle} todos={todos}/>
        <Form handleAdd={this.handleAdd} />
        <button onClick={this.handleClear}>Clear</button>
      </div>
    )
  }
}
