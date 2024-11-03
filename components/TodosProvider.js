import React, { useState, useRef, createContext } from "react";
import { dateToStr } from "../utils/util";

const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
  const testTodo = [
    {
      id: 1,
      content: "테니스 치기",
      regDate: dateToStr(new Date()),
    },
    {
      id: 2,
      content: "리액트 네이티브 공부하기",
      regDate: dateToStr(new Date()),
    },
    {
      id: 3,
      content: "할 일 앱 구현하기",
      regDate: dateToStr(new Date()),
    },
    {
      id: 4,
      content: "테니스 치기",
      regDate: dateToStr(new Date()),
    },
    {
      id: 5,
      content: "리액트 네이티브 공부하기",
      regDate: dateToStr(new Date()),
    },
    {
      id: 6,
      content: "할 일 앱 구현하기",
      regDate: dateToStr(new Date()),
    },
    {
      id: 7,
      content: "테니스 치기",
      regDate: dateToStr(new Date()),
    },
    {
      id: 8,
      content: "리액트 네이티브 공부하기",
      regDate: dateToStr(new Date()),
    },
    {
      id: 9,
      content: "할 일 앱 구현하기",
      regDate: dateToStr(new Date()),
    },
    {
      id: 10,
      content: "테니스 치기",
      regDate: dateToStr(new Date()),
    },
    {
      id: 11,
      content: "리액트 네이티브 공부하기",
      regDate: dateToStr(new Date()),
    },
    {
      id: 12,
      content: "할 일 앱 구현하기",
      regDate: dateToStr(new Date()),
    },
  ];

  // const [todos, setTodos] = useState([]);
  // const lastTodoIdRef = useRef(0);

  const [todos, setTodos] = useState([...testTodo]);
  const lastTodoIdRef = useRef(testTodo.length);

  const addTodo = (newContent) => {
    const id = ++lastTodoIdRef.current;
    const newTodo = {
      id,
      content: newContent,
      regDate: dateToStr(new Date()),
    };

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };

  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id != id);
    setTodos(newTodos);
  };

  const modifyTodo = (id, newContent) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, content: newContent } : todo
    );

    setTodos(newTodos);
  };

  return (
    <TodosContext.Provider value={{ todos, addTodo, removeTodo, modifyTodo }}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosContext;
