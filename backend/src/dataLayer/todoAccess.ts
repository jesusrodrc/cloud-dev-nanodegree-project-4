import * as AWS  from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

const XAWS = AWSXRay.captureAWS(AWS)

import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'


export class TodoAccess {

  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly todosTable = process.env.TODOS_TABLE,
    private readonly userIdIndex = process.env.USER_ID_INDEX
    ) {
  }

  async getAllTodosForUser(userId: String): Promise<TodoItem[]> {
    console.log('Getting all todos for user ' + userId)
    const result = await this.docClient.query({
      TableName: this.todosTable,
      IndexName: this.userIdIndex,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    }).promise()

    const items = result.Items
    return items as TodoItem[]
  }

  async createTodo(todo: TodoItem): Promise<TodoItem> {
    await this.docClient.put({
      TableName: this.todosTable,
      Item: todo
    }).promise()

    return todo
  }

  async deleteTodo(todoId: string, userId: string) {
    console.log("todoId: " + todoId)
    await this.docClient.delete({
      TableName: this.todosTable,
      Key: {
        todoId: todoId,
        userId: userId
      }
    }).promise()
  }

  async updateTodo(todoId: string, userId: string,
    todo: TodoUpdate) {
    console.log("Updating todo");
    const params = {
        TableName: this.todosTable,
        Key: {
            "userId": userId,
            "todoId": todoId
        },
        UpdateExpression: "set #a = :a, #b = :b, #c = :c",
        ExpressionAttributeNames: {
            "#a": "name",
            "#b": "dueDate",
            "#c": "done"
        },
        ExpressionAttributeValues: {
            ":a": todo.name,
            ":b": todo.dueDate,
            ":c": todo.done
        },
        ReturnValues: "ALL_NEW"
    }
    const result = await this.docClient.update(params).promise();
    console.log("result " + result);
  }
}

function createDynamoDBClient() {
  return new XAWS.DynamoDB.DocumentClient()
}