import { ProxyState } from "../AppState.js"
import { Task } from "../Models/Task.js"
import { tasksService } from "../Services/TasksService.js"

export class TasksController{
  constructor(){
  }
  addTask(event, list){
    event.preventDefault()
    console.log('add button worked')
    // debugger
    let form = event.target
    let newTask = {
      title: form.title.value,
      list: list
    }
    tasksService.addTask(newTask)
  }
  deleteTask(taskTitle){
    // debugger
    console.log('deleted task', taskTitle)
    tasksService.deleteTask(taskTitle)
  }
  taskComplete(taskTitle){
  tasksService.taskComplete(taskTitle)
    }
}
