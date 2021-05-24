import { ProxyState } from "../AppState.js"
import { Task } from "../Models/Task.js"
import { saveState } from "../Utils/LocalStorage.js"


class TasksService{
  addTask(newTask){
    // let newTask = new Task(formData.title, formData.description)
    console.log('newTask at service', newTask)
    ProxyState.tasks = [new Task(newTask), ...ProxyState.tasks]
  }
  deleteTask(taskTitle){
    if (window.confirm('Are you sure you want to delete this task?')){
    ProxyState.tasks = ProxyState.tasks.filter(t => t.title != taskTitle)
    console.log(ProxyState.tasks, 'remaining tasks')}
  }
  taskComplete(taskTitle){
    // debugger
    ProxyState.tasks.find(x => x.title == taskTitle)
      document.getElementById(taskTitle).classList.toggle('task-complete')
      localStorage.setItem( taskTitle, Task.checked = true)
    console.log('task completed',taskTitle)
  }
}
export const tasksService = new TasksService