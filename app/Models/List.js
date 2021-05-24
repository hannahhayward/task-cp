import { generateId } from "../Utils/GenerateId.js"

export class List{
  constructor({name, color, id}){
    this.id = id || generateId()
    this.name = name
    this.color = color
  }
}
