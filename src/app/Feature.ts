import {Task} from "./Task";

export interface Feature{
  id: number
  name: string
  tasks: Task[]
  status: string
}
