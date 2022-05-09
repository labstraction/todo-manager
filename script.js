

const task1 = new ToDo('compra il tabacco', ToDo.PRIORITY.veryHigh, ['droga']);
const task2 = new ToDo('compra il pane', ToDo.PRIORITY.medium, ['spesa', 'casa']);
const task3 = new DeadLineToDo('fai gli auguri alla nonna', new Date(2022, 6, 9), ToDo.PRIORITY.low, ['affetti']);
const task4 = new DeadLineToDo('chiama pietro');

const toDoList = [task1, task2, task3, task4];

// function displayToDo() {

//   const container = document.getElementById('todo-container');

//   for (let i = 0; i < toDoList.length; i++) {
//     const todo = toDoList[i];

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


function displayToDoWithTemplate(){
  const template = `
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
  const todoListContainer = document.getElementById('todo-list-container')

  for (let i = 0; i < toDoList.length; i++) {
    const todo = toDoList[i];



    const div = document.createElement('div');
    const todoTemplate = template.replace('#TODONAME', todo.name)
                                 .replace('#CREATIONDATE', todo.creationDate.toISOString())

    div.innerHTML = todoTemplate;
    todoListContainer.appendChild(div);

    const todoContainer = div.querySelector('.todo-container');
    todoContainer.style.borderColor = todo.priority.color;

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

displayToDoWithTemplate();


const doneList = [];

