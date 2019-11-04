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
    jwtToken: string
  ): Promise<TodoItem> {
  
    jwtToken
    const itemId = uuid.v4()
    const userId = "userPlaceholder"
  
    return await todoAccess.createTodo({
        userId: userId,
        todoId: itemId,
        createdAt: new Date().toISOString(),
        name: createTodoRequest.name,
        dueDate: createTodoRequest.dueDate,
        done: false,
        attachmentUrl: "empty"
    })
  }

export async function updateTodo(
  todoId: string,
  updateTodoRequest: UpdateTodoRequest
) {

  return await todoAccess.updateTodo(todoId, {
      name: updateTodoRequest.name,
      dueDate: updateTodoRequest.dueDate,
      done: updateTodoRequest.done
  })
}  