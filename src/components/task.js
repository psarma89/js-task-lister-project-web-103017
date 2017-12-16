/*
task is responsible for creating a single task object
*/
const Task = (() => {
  let id = 1
  return class Task {
    constructor(description, list, priority = 'low') {
      //your code here
      this.description = description;
      this.id = id++;
      this.priority = priority;
      if (list){
        this.listId = list.id;
      }
      store.tasks.push(this)
    }
    list(){
      return store.lists.find((list) => {return list.id === this.listId})
    }
  }
})()
