import React, { useEffect, useState } from "react";
import logo from "./gadoe.png";
import "./App.css";
import { GetTodos, TodoType } from "./agent";
import { ModifyTodo } from "./agent";
import { CreateTodo } from "./agent";
import { BuiltWithBrev } from "built-with-brev";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todoList, setTodoList] = useState<TodoType[]>([]);

  const refreshTodoList = async () => {
    let response = await GetTodos();
    console.log(response);
    setTodoList(response);
  };

  const createTodo = async () => {
    let response = await CreateTodo(newTodo);
    console.log(response);
    refreshTodoList();
  };

  const modifyTodo = async (id: string) => {
    let response = await ModifyTodo(id);
    refreshTodoList();
  };

  useEffect(() => {
    refreshTodoList();
  }, []);

  return (
    <div className="App">
      <div className={"App-header"}>
        
        <img src={logo} className="App-logo" alt="logo" />

        {/* <h1>Georgia Dept of Education</h1> */}
      </div>
      <header className="App-body">
        
        <div className={"todo-container"}>


          {todoList.map((t) => {
            return !t.isComplete ? (
              <Checkbox
                todo={t}
                onChange={() => {
                  modifyTodo(t.id);
                }}
              />
            ) : (
              ""
            );
          })}
        </div>

          <input
            value={newTodo}
            onChange={(event) => {
              setNewTodo(event.target.value);
            }}
          />

          <button
            onClick={createTodo}
            >add todo</button>


        <div className={"footer"}>
          <p>brev.dev 🤙 </p>
        </div>

      </header>

    </div>
  );
}

export default App;


  // <Checkbox
  // todo={t}
  // onChange={() => {
  //   modifyTodo(t.id);
  // }}
  // />

interface CheckboxProps {
  todo: TodoType;
  onChange: (id: string) => void;
}

const Checkbox = (props: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(props.todo.isComplete);

  return (
    <label>
      <input
        type={"checkbox"}
        onChange={() => {
          setIsChecked(!isChecked);
          props.onChange(props.todo.id);
        }}
        value={props.todo.title}
        checked={isChecked}
      />
      {props.todo.title}
    </label>
  );
};