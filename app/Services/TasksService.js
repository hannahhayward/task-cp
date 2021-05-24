import { ProxyState } from "../AppState.js"
import { Task } from "../Models/Task.js"


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
  taskComplete(){
    // ProxyState.tasks = ProxyState.tasks.filter(t => t.title != taskTitle)
    var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);
    console.log('you completed a task!')
  }
}
export const tasksService = new TasksService