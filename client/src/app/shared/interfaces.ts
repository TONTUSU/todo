

export interface User {
  email: String
  password: String
}

export interface Todo {
  title: string
  priority?: string
  status: boolean
  deadLine?: string
  _id?: string
  user?: User
}

export interface Message {
  message: string
}
