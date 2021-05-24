
import {List} from '../Models/List.js'
import { ProxyState } from '../AppState.js'
import { saveState } from "../Utils/LocalStorage.js"

class ListsService {
  constructor() {
    ProxyState.on('lists', saveState)
    ProxyState.on('tasks', saveState)
  }
    addList(newList){
      // let newList = new List(formData.name, formData.color)
      ProxyState.lists = [...ProxyState.lists, new List(newList)]
    }
    deleteList(listId){
      if (window.confirm('Are you sure yu want to delete this list?')){
      ProxyState.lists = ProxyState.lists.filter(l => l.id != listId)
      console.log(ProxyState.lists, 'remaining lists')}
    }
}
export const listsService = new ListsService()