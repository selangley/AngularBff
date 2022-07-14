import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todos: Todo[] = [];
  loading: boolean = false;
  todoName: string = "Do something";
  todoDate: string = "2021-03-01";
  error: any = null;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Todo[]>(baseUrl + 'todos', { headers: {"X-CSRF": "1"} }).subscribe(
      result => {
        this.todos = result;
      },
      error => console.error(error));
  }
  /*
     static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      loading: true,
      error: null,
      todoName: "Do something",
      todoDate: "2021-03-01",
    };

    this.createTodo = this.createTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  } 
  */

  /*
    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }
   */

  ngOnInit(): void {
    console.log('');
  }

  createTodo(): void { }

  deleteTodo(id: number) { }



}

interface Todo {
  id: number;
  date: string;
  note: string;
  user: string;
}

/*
import React, { Component } from "react";

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      loading: true,
      error: null,
      todoName: "Do something",
      todoDate: "2021-03-01",
    };

    this.createTodo = this.createTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  componentDidMount() {
    (async () => this.populateTodos())();
  }

  async populateTodos() {
    const response = await fetch("todos", {
      headers: {
        "X-CSRF": 1,
      },
    });
    if (response.ok) {
      const data = await response.json();
      this.setState({ todos: data, loading: false, error: null });
    } else if (response.status !== 401) {
      this.setState({ error: response.status });
    }
  }

  async createTodo(e) {
    e.preventDefault();
    const response = await fetch("todos", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-csrf": "1",
      },
      body: JSON.stringify({
        name: this.state.todoName,
        date: this.state.todoDate,
      }),
    });

    if (response.ok) {
      var item = await response.json();
      this.setState({
        todos: [...this.state.todos, item],
        todoName: "Do something",
        todoDate: "2021-03-02",
      });
    } else {
      this.setState({ error: response.status });
    }
  }

  async deleteTodo(id) {
    const response = await fetch(`todos/${id}`, {
      method: "DELETE",
      headers: {
        "x-csrf": 1,
      },
    });
    if (response.ok) {
      const todos = this.state.todos.filter((x) => x.id !== id);
      this.setState({ todos });
    } else {
      this.setState({ error: response.status });
    }
  }

 
}

 */
