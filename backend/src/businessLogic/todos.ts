import * as uuid from 'uuid'

import { TodoItem } from '../models/TodoItem'
import { TodoAccess } from '../dataLayer/todoAccess'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'

const todoAccess = new TodoAccess()

export async function getAllTodosForUser(userId: string): Promise<TodoItem[]> {
  return todoAccess.getAllTodosForUser(userId);
}

export async function createTodo(
    createTodoRequest: CreateTodoRequest,
    userId: string
  ): Promise<TodoItem> {
    console.log("creating todo")
    const itemId = uuid.v4()
  
    const thing = await todoAccess.createTodo({
        userId: userId,
        todoId: itemId,
        createdAt: new Date().toISOString(),
        name: createTodoRequest.name,
        dueDate: createTodoRequest.dueDate,
        done: false,
        attachmentUrl: "empty"
    })
    return thing
  }

export async function deleteTodo(todoId: string, userId: string) {
  await todoAccess.deleteTodo(todoId, userId)
  return
}

export async function updateTodo(
  todoId: string,
  userId: string,
  updateTodoRequest: UpdateTodoRequest
) {
  console.log("calling db method to update todo")
  return await todoAccess.updateTodo(todoId, userId, {
      name: updateTodoRequest.name,
      dueDate: updateTodoRequest.dueDate,
      done: updateTodoRequest.done
  })
}

export function generateUploadUrl(todoId: string): Promise<string> {
  return toDoAccess.generateUploadUrl(todoId);
}