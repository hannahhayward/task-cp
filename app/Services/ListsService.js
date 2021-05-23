
import {List} from '../Models/List.js'
import { ProxyState } from '../AppState.js'

class ListsService {
  constructor() {}
    addList(formData){
      let newList = new List(formData.name, formData.color)
      ProxyState.lists = [newList, ...ProxyState.lists]
    }
    deleteList(listId){
      debugger
      ProxyState.lists = ProxyState.lists.filter(l => List.id != listId)
      console.log(ProxyState.lists)
    }
}
export const listsService = new ListsService()