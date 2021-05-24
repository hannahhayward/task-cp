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
  taskComplete(){
    var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);
  console.log('task completed')
  tasksService.taskComplete()
}
}