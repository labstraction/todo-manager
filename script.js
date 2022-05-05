

const task1 = new ToDo('compra il tabacco', ToDo.PRIORITY.veryHigh, ['droga']);
const task2 = new ToDo('compra il pane', ToDo.PRIORITY.medium, ['spesa', 'casa']);
const task3 = new DeadLineToDo('fai gli auguri alla nonna', new Date(2022, 6, 9), ToDo.PRIORITY.low, ['droga']);
const task4 = new DeadLineToDo('chiama pietro');

const toDoList = [task1, task2, task3, task4];

function displayToDo() {
  
}


const doneList = [];

