import { ProxyState } from "../AppState.js"
import { listsService } from "../Services/ListsService.js"
import { loadState } from "../Utils/LocalStorage.js"

function draw() {
  let lists = ProxyState.lists
  let listElm = document.getElementById('lists')
  let template = ''
// debugger

  lists.forEach(l => {
    let tasks = ProxyState.tasks.filter(t => t.list == l.id)
    let tasksTotal = 0
    let completedTasks = 0
    template += /*html*/ `
    <div class="col-4">
      <div class="card ${l.color == 1 ? 'bg-primary' : l.color == 2 ? 'bg-danger' : l.color == 3 ? 'bg-secondary' : l.color == 4 ? 'bg-success' : l.color == 5 ? 'bg-info' : l.color == 6 ? 'bg-dark' : ''} my-2">
      <div class="card-title text-center">
      <h2 class="text-light">${l.name}</h2>
        </div>
        <ul class=" list-group list-group-flush ">`
    tasks.forEach(t => {
      tasksTotal += t.value
      template +=  /*html*/ `<li class = "list-group-item ${l.color == 1 ? 'bg-primary' : l.color == 2 ? 'bg-danger' : l.color == 3 ? 'bg-secondary' : l.color == 4 ? 'bg-success' : l.color == 5 ? 'bg-info' : l.color == 6 ? 'bg-dark' : ''} ">
                <div> 
                <b>${t.title}</b>
                <div>
                <button class="trash btn" onclick="app.tasksController.deleteTask('${t.title}')">trash</button>
                <button class="completed btn" onclick="app.tasksController.taskComplete()" >Complete </button>
                </div>
                </div>
                </li>
                <ul class =" list-group list-group-flush">`
    })
    template += /*html*/ `</ul>
              <form onsubmit = "app.tasksController.addTask(event, '${l.id}')">
              <label for="title" class="sr-only">Title:</label>
              <input type="text" name="title" class="form-control" placeholder="Task Title" minlength="3" maxlength="50" required>
              <button type="submit" class="btn btn-primary"> Add Task</button>
              </form>
              <h6 class="text-center"> tasks completed: ${completedTasks}</h6>
              <p class="text-center"> total tasks: ${tasksTotal} </p>
              <button class = "btn bg-transparent" onclick="app.listsController.deleteList('${l.id}')" > DELETE </button>
              </div>
          </div>
      </div>`
  })
  listElm.innerHTML = template
}

export class ListsController {
  constructor() {
    ProxyState.on('lists', draw)
    ProxyState.on('tasks', draw)
    loadState()
  }
  addList(event) {
    event.preventDefault()
    console.log('button worked')
    // debugger
    let form = event.target
    let formData = {
      name: form.name.value,
      color: form.color.value
    }
    listsService.addList(formData)
    draw()
    console.log(ProxyState.lists)
  }
  deleteList(listId) {
    console.log('deleted list', listId)
    listsService.deleteList(listId)
  }
 
}