// let store = {tasks: [], lists: []};
document.addEventListener('DOMContentLoaded', () => {
  // your code here ....
  // console.log(Task)
  const newList = document.getElementById('new-list-title');
  const newListButton = document.querySelector('form#create-list-form input[type=submit]');
  const taskForm = document.querySelector('form#create-task-form');
  const newTaskButton = taskForm.querySelector('input[type=submit]');
  const listSelect = taskForm.querySelector('select#parent-list');
  const listSection = document.querySelector('section#lists');
  const taskDescription = taskForm.querySelector('input[type=text]#new-task-description');
  const priorityLevel = taskForm.querySelector('input[type=text]#new-task-priority');

  taskForm.style.display = "none"

  function createElementId(text,obj){
    if (obj) {
      return `${text.split(' ').join('-')}-${obj.id}`
    }else {
      return `${text.split(' ').join('-')}`
    }
  }

  function displayOptions(list){
    const option = document.createElement('option');
    option.value = list.title;
    option.innerText = list.title;
    option.id = createElementId(list.title,list);
    option.class = list.id;
    listSelect.appendChild(option);
  }

  function displayTasks(list){
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    const button = document.createElement('button')
    button.innerText = 'X';
    button.type = "button";
    button.id = createElementId(list.title, list);
    button.class = list.id;
    div.id = createElementId(list.title, list);
    h2.appendChild(button);
    h2.innerHTML += list.title;
    div.appendChild(h2);
    listSection.appendChild(div);
  }

  function displayAllLists(){
    fetch('http://localhost:3000/lists').then(res => res.json()).then(json => {
      json.forEach(list => {
        displayOptions(list)
        displayTasks(list)
        taskForm.style.display = ""
      })
    })
  }

  function createListAPI(tempList){
    fetch('http://localhost:3000/lists', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tempList)
    }).then(resp => resp.json()).then(list => {
      displayOptions(list)
      displayTasks(list)
      taskForm.style.display = ""
    })
  }

  function deleteListAPI(listId){
    const id = parseInt(listId.split("-")[listId.split("-").length-1])
    fetch(`http://localhost:3000/lists/${id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.json()).then(list => {
      listSelect.querySelector(`option#${listId}`).remove()
      listSection.querySelector(`div#${listId}`).remove()
      if (listSection.children.length === 0) {
        taskForm.style.display = "none"
      }
    })
  }

  displayAllLists();

  newListButton.addEventListener('click', function(e){
    e.preventDefault()
    if (newList.value){
      const tempList = {title: newList.value};
      createListAPI(tempList)
      newList.value = "";
    }
  })

  document.body.addEventListener('click', function(e){
    e.preventDefault()
    if (e.target.type === 'button'){
      deleteListAPI(e.target.id)
    }
  })

  function creteTaskAPI(id, listId){
    const tempTask = {description: taskDescription.value, priority: priorityLevel.value || "low", listId: id}

    fetch('http://localhost:3000/tasks', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tempTask)
    }).then(res => res.json()).then(task => {
      const listDivUl = listSection.querySelector(`div#${listId} ul`);
      if (listDivUl) {
        const li = document.createElement('li');
        li.id = createElementId(task.description, task)
        li.innerHTML = `Task: ${task.description}` + '<br>' + `Priority: ${task.priority}`
        listDivUl.appendChild(li)
      }else {
        const listDiv = listSection.querySelector(`div#${listId}`);
        const ul = document.createElement('ul')
        ul.id = listId
        listDiv.appendChild(ul)
        const li = document.createElement('li');
        li.id = createElementId(task.description, task)
        li.innerHTML = `Task: ${task.description}` + '<br>' + `Priority: ${task.priority}`
        ul.appendChild(li)
      }
      taskDescription.value = ""
      priorityLevel.value = ""
    })
  }

  newTaskButton.addEventListener('click', function(e){
    e.preventDefault();
    if (listSelect.value && taskDescription.value){
      const id = listSelect.selectedOptions[0].class
      const listId = listSelect.selectedOptions[0].id
      creteTaskAPI(id, listId)
    }
  })
});
