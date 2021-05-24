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
    let completeTasks = 0
    template += /*html*/ `
    <div class="col-4">
      <div class="card ${l.color == 1 ? 'bg-primary' : l.color == 2 ? 'bg-danger' : l.color == 3 ? 'bg-secondary' : l.color == 4 ? 'bg-success' : l.color == 5 ? 'bg-info' : l.color == 6 ? 'bg-dark' : ''} my-2">
      <div class="card-title text-center">
      <h2 class="text-light">${l.name}</h2>
        </div>
        <ul class=" list-group list-group-flush ">`
    tasks.forEach(t => {
      tasksTotal += t.value
      template +=  /*html*/ `<li class = "list-group-item ${l.color == 1 ? 'bg-primary' : l.color == 2 ? 'bg-danger' : l.color == 3 ? 'bg-secondary' : l.color == 4 ? 'bg-success' : l.color == 5 ? 'bg-info' : l.color == 6 ? 'bg-dark' : ''} text-light text-center">
                <div> 
                <b id='${t.title}'>${t.title}</b>
                <div>
                <button class="trash btn text-light" onclick="app.tasksController.deleteTask('${t.title}')">
                <i class="mdi mdi-trash-can-outline"></i>
                </button>
                <button class="completed btn text-light" onclick="app.tasksController.taskComplete('${t.title}')">
                <i class="mdi mdi-checkbox-marked"></i>
                </button>
                </div>
                </div>
                </li>
                <ul class =" list-group list-group-flush">`
    })
    template += /*html*/ `</ul>
              <div class="card-body">
              <form onsubmit = "app.tasksController.addTask(event, '${l.id}')">
              <label for="title" class="sr-only">Title:</label>
              <input type="text" name="title" class="form-control" placeholder="Task Title" minlength="3" maxlength="50" required>
              <button type="submit" class="btn btn-outline-light btn-block my-1"> 
              <i class="mdi mdi-plus-box"></i>
              </button>
              </form>
              <div class="card-footer">
              <h6 class= "text-center text-light"> completed tasks: ${completeTasks} </h6>
              <p class="text-center text-light"> total tasks: ${tasksTotal} </p>
              <button class = "btn btn-block btn-outline-light" onclick="app.listsController.deleteList('${l.id}')" > 
              <i class="mdi mdi-trash-can-outline"></i>
              </button>
              </div>
              </div>
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
    // debugger
    let form = event.target
    let formData = {
      name: form.name.value,
      color: form.color.value
    }
    listsService.addList(formData)
    draw()
    console.log(formData)
  }
  deleteList(listId) {
    console.log('deleted list', listId)
    listsService.deleteList(listId)
  }
 
}