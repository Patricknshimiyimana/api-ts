import { Router } from "express";
import { Todo } from "../models/todo";

const todos: Todo[] = [];

const router = Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ todos: todos });
});

router.post("/todo", (req, res, next) => {
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: req.body.text,
  };
  todos.push(newTodo);
  res.status(201).json({ message: "todo added successfully", todos: todos });
});

router.put("/todo/:todoId", (req, res, next) => {
  const selectedTodoId = req.params.todoId;
  const selectedTodoIndex = todos.findIndex(
    (todoItem) => todoItem.id === selectedTodoId
  );

  if (selectedTodoIndex >= 0) {
    todos[selectedTodoIndex] = {
      id: todos[selectedTodoIndex].id,
      text: req.body.text,
    };
    return res.json({
      message: "todo updated!",
      todo: todos[selectedTodoIndex],
    });
  }
  res.status(404).json({ message: "could not find todo with that id" });
});

export default router;
