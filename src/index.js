let store = {tasks: [], lists: []};
document.addEventListener('DOMContentLoaded', () => {
  // your code here ....
  // console.log(Task)
  const newList = document.getElementById('new-list-title');
  const newListButton = document.querySelector('form#create-list-form input[type=submit]');
  const newTaskButton = document.querySelector('form#create-task-form input[type=submit]');
  const listSelect = document.querySelector('form#create-task-form select#parent-list');
  const listSection = document.querySelector('section#lists');
  const taskDescription = document.querySelector('form#create-task-form input[type=text]#new-task-description');
  const priorityLevel = document.querySelector('form#create-task-form input[type=text]#new-task-priority');

  function fixId(text,obj){
    if (obj) {
      return `${text.split(' ').join('-')}-${obj.id}`
    }else {
      return `${text.split(' ').join('-')}`
    }
  }
  newListButton.addEventListener('click', function(e){
    e.preventDefault()
    if (newList.value){
      const list = new List(newList.value);
      const option = document.createElement('option');
      option.value = newList.value;
      option.innerText = newList.value;
      option.id = fixId(newList.value,list);
      option.class = list.id;
      listSelect.appendChild(option);

      const div = document.createElement('div');
      const h2 = document.createElement('h2');
      const button = document.createElement('button')
      button.innerText = 'X';
      button.type = "button";
      button.id = fixId(newList.value, list);
      div.id = fixId(newList.value, list);
      h2.appendChild(button);
      h2.innerHTML += newList.value;
      div.appendChild(h2);
      listSection.appendChild(div);

      newList.value = "";
    }
  })

  document.body.addEventListener('click', function(e){
    e.preventDefault()
    if (e.target.type === 'button'){
      const optionToDelete = document.querySelector(`select#parent-list option#${e.target.id}`)
      optionToDelete.remove()
      e.target.parentElement.parentElement.remove()
    }
  })

  newTaskButton.addEventListener('click', function(e){
    e.preventDefault();
    if (listSelect.value && taskDescription.value){
      const listId = listSelect.selectedOptions[0].class
      const list = List.findList(listId)
      if (priorityLevel.value) {
        const task = new Task(taskDescription.value, list)
        task.priority = priorityLevel.value
      }else {
        const task = new Task(taskDescription.value, list)
        task.priority = "low"
      }
      const listDivUl = document.querySelector(`section#lists div#${fixId(list.title, list)} ul`);
      // console.log(listDiv)
      // debugger
      const task = store.tasks[store.tasks.length -1]
      if (listDivUl) {
        const li = document.createElement('li');
        li.id = fixId(task.description, task)
        li.innerHTML = `Task: ${task.description}` + '<br>' + `Priority: ${task.priority}`
        listDivUl.appendChild(li)
      }else {
        const listDiv = document.querySelector(`section#lists div#${fixId(list.title, list)}`);
        const ul = document.createElement('ul')
        ul.id = fixId(list.title, list)
        listDiv.appendChild(ul)
        const li = document.createElement('li');
        li.id = fixId(task.description, task)
        li.innerHTML = `Task: ${task.description}` + '<br>' + `Priority: ${task.priority}`
        ul.appendChild(li)
      }
      taskDescription.value = ""
      priorityLevel.value = ""
    }
  })

});
