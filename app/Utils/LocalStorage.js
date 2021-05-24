import { List } from "../Models/List.js"
import { Task } from "../Models/Task.js"
import {ProxyState} from "../AppState.js"


export function saveState(){
  localStorage.setItem('taskchecker', JSON.stringify({
    lists: ProxyState.lists,
    tasks: ProxyState.tasks
  }))
console.log('saved state', ProxyState)
}

export function loadState(){
  let data = JSON.parse(localStorage.getItem('taskchecker'))
  console.log(data)
  if(data != null){
    ProxyState.lists = data.lists.map(l => new List(l))
    ProxyState.tasks = data.tasks.map(t => new Task(t))
  }
}