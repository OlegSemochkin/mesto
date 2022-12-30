//import {Card} from '../components/Card.js'
//import {bigPhoto, cardTemplate} from '../pages/index.js'
export default class Section {
  constructor ({data, renderer}, selector){
    this._initialArray = data;
    this._renderer = renderer;
    this._container = selector;
  }
  addItem (element){
    this._container.prepend(element)
  }

  renderItems () {
    this._initialArray.forEach((item) => {
      this._renderer(item)
  })
  }
}