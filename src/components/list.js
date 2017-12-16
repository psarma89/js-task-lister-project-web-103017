/*
list is responsible for creating a single list component
*/
const List = (() => {
  let id = 1
  return class List {
    constructor(title) {
      //your code here
      // NOTE: How can we use the private id variable to auto increment list ids🤔?
      this.id = id++
      this.title = title
      store.lists.push(this)
    }
    tasks(){
      return store.tasks.filter((task) => {return task.listId === this.id})
    }
    static findList(id){
      return store.lists.find((list) => {return list.id === id})
    }
  }
})()
