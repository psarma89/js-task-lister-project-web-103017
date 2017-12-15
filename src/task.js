/*
task is responsible for creating a single task object
*/
const Task = (() => {
  let id = 1
  return class Task {
    constructor(description, list) {
      //your code here
      this.description = description;
      this.id = id++;
      if (list){
        this.listId = list.id;
      }
      store.tasks.push(this)
    }
    setListId(list){
      this.listId = list.id
    }
    list(){
      return store.lists.find((list) => {return list.id === this.listId})
    }
  }
})()
