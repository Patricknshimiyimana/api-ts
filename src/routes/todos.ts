import { Router } from "express";
import { Todo } from "../models/todo";

type RequestBody = { text: string };
type RequestParams = { todoId: string };

let todos: Todo[] = [];

const router = Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ todos: todos });
});

router.post("/todo", (req, res, next) => {
  const body = req.body as RequestBody;
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: body.text,
  };
  todos.push(newTodo);
  res.status(201).json({ message: "todo added successfully", todos: todos });
});

router.put("/todo/:todoId", (req, res, next) => {
  const params = req.params as RequestParams;
  const selectedTodoId = params.todoId;
  const body = req.body as RequestBody;
  const selectedTodoIndex = todos.findIndex(
    (todoItem) => todoItem.id === selectedTodoId
  );

  if (selectedTodoIndex >= 0) {
    todos[selectedTodoIndex] = {
      id: todos[selectedTodoIndex].id,
      text: body.text,
    };
    return res.json({
      message: "todo updated!",
      todo: todos[selectedTodoIndex],
    });
  }
  res.status(404).json({ message: "could not find todo with that id" });
});

router.delete("/todo/:todoId", (req, res, next) => {
  const params = req.params as RequestParams;
  const selectedTodoId = params.todoId;
  todos = todos.filter((todoItem) => todoItem.id !== selectedTodoId);
  res.status(200).json({ message: "todo deleted!", todos: todos });
});

export default router;
