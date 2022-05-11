

const task1 = new ToDo('compra il tabacco', ToDo.PRIORITY.veryHigh, ['droga']);
const task2 = new ToDo('compra il pane', ToDo.PRIORITY.medium, ['spesa', 'casa']);
const task3 = new DeadLineToDo('fai gli auguri alla nonna', new Date(2022, 6, 9), ToDo.PRIORITY.low, ['affetti']);
const task4 = new DeadLineToDo('chiama pietro');

let toDoList = [task1, task2, task3, task4];

const doneList = [];

const todoTemplate = `
      <div class="todo-container">
      <div class="first-container">
        <div class="name-and-tag-container">
          <span class="todo-name">#TODONAME</span>
          <div class="tag-container">
          </div>
        </div>
        <button class="done-button">Fatto</button>
      </div>
      <div class="date-container">
        <span>#CREATIONDATE</span>
      </div>
    </div>
  `

const doneTemplate = `
      <div class="todo-container">
      <div class="first-container">
        <div class="name-and-tag-container">
          <span class="todo-name">#TODONAME</span>
          <div class="tag-container">
          </div>
        </div>
      </div>
      <div class="date-container">
        <span>#CREATIONDATE</span>
      </div>
    </div>
  `

// function displayToDo() {

//   const container = document.getElementById('todo-container');

//   for (let i = 0; i < doneList.length; i++) {
//     const todo = doneList[i];

//     const todoDiv = document.createElement('div');
//     todoDiv.classList.add('todo-div');
//     container.appendChild(todoDiv);

//     const firstContainer = document.createElement('div');
//     firstContainer.classList.add('first-container');
//     todoDiv.appendChild(firstContainer);

//     const nameAndTagsContainer = document.createElement('div');
//     nameAndTagsContainer.classList.add('nt-container');
//     firstContainer.appendChild(nameAndTagsContainer);

//     const todoNameSpan = document.createElement('span');
//     const nameNode = document.createTextNode(todo.name);
//     todoNameSpan.appendChild(nameNode);
//     nameAndTagsContainer.appendChild(todoNameSpan);


//     const tagContainer = document.createElement('div');
//     tagContainer.classList.add('tag-container');
//     nameAndTagsContainer.appendChild(tagContainer);

//     for (const tag of todo.tags) {

//       const tagSpan = document.createElement('span');
//       const tagNode = document.createTextNode(tag);
//       tagSpan.appendChild(tagNode);
//       tagContainer.appendChild(tagSpan);
      
//     }

//     const doneButton = document.createElement('button');
//     const doneNode = document.createTextNode('completato')
//     doneButton.appendChild(doneNode);
//     firstContainer.appendChild(doneButton);



//     ///// date container

//     const dateContainer = document.createElement('div');
//     dateContainer.classList.add('date-container')
//     todoDiv.appendChild(dateContainer);

//     const startDateSpan = document.createElement('span');
//     const startDateNode = document.createTextNode(todo.creationDate.toISOString());
//     startDateSpan.appendChild(startDateNode)
//     dateContainer.appendChild(startDateSpan);

//     if (todo.deadLineDate) {
//       const endDateSpan = document.createElement('span');
//       const endDateNode = document.createTextNode(todo.deadLineDate.toISOString());
//       endDateSpan.appendChild(endDateNode)
//       dateContainer.appendChild(endDateSpan);
//     }
    
//   }
  
// }

// displayToDo();


function displayToDoWithTemplate(template, containerName, todoArray){
  
  const mainContainer = document.getElementById(containerName)
  mainContainer.innerHTML = '';

  for (let i = 0; i < todoArray.length; i++) {

    const todo = todoArray[i];

    const div = document.createElement('div');
    const todoTemplate = template.replace('#TODONAME', todo.name)
                                 .replace('#CREATIONDATE', todo.creationDate.toISOString())

    div.innerHTML = todoTemplate;
    mainContainer.appendChild(div);

    const doneButton = div.querySelector('.done-button');
    if (doneButton) {
      doneButton.style.backgroundColor = todo.priority.color;
      doneButton.onclick = () => removeDoneToDo(todo);
    }

    if (todo.deadLineDate) {
      const dateContainer = div.getElementsByClassName('date-container')[0];
      //const dateContainer = div.querySelector('.date-container');
      const dateSpan = document.createElement('span');
      const dateNode = document.createTextNode(todo.deadLineDate.toISOString());
      dateSpan.appendChild(dateNode);
      dateContainer.appendChild(dateSpan);
    }

    const tagContainer = div.querySelector('.tag-container');
    for (const tag of todo.tags) {
      const tagSpan = document.createElement('span');
      tagSpan.classList.add('tag');
      const node = document.createTextNode(tag);
      tagSpan.appendChild(node);
      tagContainer.appendChild(tagSpan);
    }
  }
}


// function displayDoneWithTemplate() {
//   const template = `
//       <div class="todo-container">
//       <div class="first-container">
//         <div class="name-and-tag-container">
//           <span class="todo-name">#TODONAME</span>
//           <div class="tag-container">
//           </div>
//         </div>
//       </div>
//       <div class="date-container">
//         <span>#CREATIONDATE</span>
//       </div>
//     </div>
//   `
//   const doneContainer = document.getElementById('done-container')

//   doneContainer.innerHTML = '';

//   for (let i = 0; i < doneList.length; i++) {
//     const todo = doneList[i];

//     const div = document.createElement('div');
//     const todoTemplate = template.replace('#TODONAME', todo.name)
//       .replace('#CREATIONDATE', todo.creationDate.toISOString())

//     div.innerHTML = todoTemplate;
//     doneContainer.appendChild(div);

//     if (todo.deadLineDate) {
//       const dateContainer = div.getElementsByClassName('date-container')[0];
//       //const dateContainer = div.querySelector('.date-container');
//       const dateSpan = document.createElement('span');
//       const dateNode = document.createTextNode(todo.deadLineDate.toISOString());
//       dateSpan.appendChild(dateNode);
//       dateContainer.appendChild(dateSpan);
//     }

//     const tagContainer = div.querySelector('.tag-container');
//     for (const tag of todo.tags) {
//       const tagSpan = document.createElement('span');
//       tagSpan.classList.add('tag');
//       const node = document.createTextNode(tag);
//       tagSpan.appendChild(node);
//       tagContainer.appendChild(tagSpan);
//     }
//   }
// }


displayToDoWithTemplate(todoTemplate, "todo-list-container", toDoList);


function removeDoneToDo(todo){
  toDoList = toDoList.filter(t => t.name !== todo.name);
  displayToDoWithTemplate(todoTemplate, "todo-list-container", toDoList);
  doneList.push(todo);
  displayToDoWithTemplate(doneTemplate, "done-container", doneList);
}



function orderByName() {
  toDoList.sort(compareByName);
  displayToDoWithTemplate(todoTemplate, "todo-list-container", toDoList);
  doneList.sort(compareByName);
  displayToDoWithTemplate(doneTemplate, "done-container", doneList);
}

function compareByName(todo1, todo2) {
  return todo1.name.localeCompare(todo2.name);
}

function orderByDate() {
  toDoList.sort(compareByDate);
  displayToDoWithTemplate(todoTemplate, "todo-list-container", toDoList);
  doneList.sort(compareByDate);
  displayToDoWithTemplate(doneTemplate, "done-container", doneList);
}

function compareByDate(todo1, todo2) {
  return todo1.creationDate.getTime() - todo2.creationDate.getTime();
}


const dateButton = document.getElementById('date-order-btn');
dateButton.onclick = orderByDate;


function orderByPriority() {
  toDoList.sort(compareByPriority);
  displayToDoWithTemplate(todoTemplate, "todo-list-container", toDoList);
  doneList.sort(compareByPriority);
  displayToDoWithTemplate(doneTemplate, "done-container", doneList);
}

function compareByPriority(todo1, todo2) {
  return todo2.priority.order - todo1.priority.order;
}

function logToConsole(event){
  console.log(event);
}

function changeButtonColor(button){
  button.style.backgroundColor = 'red';
}

function removeButtonColor(event){
  event.target.style.backgroundColor = ''
}

const priorityButton = document.getElementById('priority-order-btn');
priorityButton.addEventListener('click', orderByPriority);
priorityButton.addEventListener('click', logToConsole);

priorityButton.addEventListener('mouseenter', () => changeButtonColor(priorityButton));
priorityButton.addEventListener('mouseleave', removeButtonColor);