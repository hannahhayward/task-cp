import { ProxyState } from "../AppState.js"
import { listsService } from "../Services/ListsService.js"
import { generateId } from "../Utils/GenerateId.js"


export class ListsController{
  constructor(){
    ProxyState.on('lists', this.drawLists)
    this.drawLists()
  }

  drawLists(){
    let template = ''
    let tasks = 0
    ProxyState.lists.forEach(list =>{
      template += /*html*/ `
      <div class="col-3">
          <div class="card ${list.color == 1 ? 'bg-primary' : list.color == 2 ? 'bg-danger' : list.color == 3 ? 'bg-secondary' : list.color == 4 ? 'bg-success' : list.color == 5 ? 'bg-info' : list.color == 6 ? 'bg-dark' : ''} my-2">
              <div class="card-title ">
                  <h2 class="text-light">${list.name}</h2>
                  <p> ${tasks} </p>
              </div>
              TODO - tasks
              <div class="card-body">
                  <ul class="list-group list-group-flush">
                      <li class="list-group-item">An item</li>
                      <li class="list-group-item">A second item</li>
                      <li class="list-group-item">A third item</li>
                  </ul>
              </div>
              <button class = "btn bg-transparent" onclick="app.listsController.deleteList('listId')" > DELETE </button>
          </div>
      </div>

      `
    })
    document.getElementById('lists').innerHTML = template
    console.log('drew')
  }
addList(event){
  event.preventDefault()
  console.log('button worked')
  // debugger
  let form = event.target
  let formData = {
    name: form.name.value,
    color: form.color.value
  }
  listsService.addList(formData)
  this.drawLists()
  console.log(ProxyState.lists)
}
deleteList(listId){
  console.log('deleted list', listId)
  listsService.deleteList(listId)
}
}