// Elements
const clear = document.getElementById("clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("tasks-list");
const input = document.getElementById("task");
const add_to_do = document.getElementById("add-to-do");
const TODO = document.getElementById("tasks");
const TODODone = document.getElementById("tasks-done");
const TODORemaining = document.getElementById("tasks-remaining");

// Class Names
const TASK_DONE = "task-done";
const TASK_ADDED = "task-added";
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle";
const LINE_THROUGH = "text-decoration-line-through";

// Show Today's Date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

var ID = 0;
var tasksAdded = 0;
var tasksDone = 0;
var tasksRemaining = 0;

const counterChange = () => {
  TODO.children[1].innerHTML = tasksAdded;
  TODODone.children[1].innerHTML = tasksDone;
  TODORemaining.children[1].innerHTML = tasksRemaining;
};

counterChange();

const addToDo = (toDo, id) => {
  const position = "beforeend";
  const item = `<li id="${id}" class="task-card task-added">
                    <i class="far fa-circle fa-2x py-1 me-2" onclick="taskDone(this.parentNode, this)"></i>
                    <span class="flex-grow-1">${toDo}</span>
                    <i class="fas fa-trash-alt fa-2x py-1 ms-2" onclick="taskTrash(this.parentNode.id)"></i>
                </li>`;

  list.insertAdjacentHTML(position, item);
};

const taskDone = (parentNode, node) => {
  parentNode.classList.add(TASK_DONE);
  parentNode.classList.remove(TASK_ADDED);
  parentNode.children[1].classList.add(LINE_THROUGH);
  node.classList.add("fas", CHECK);
  node.classList.remove("far", UNCHECK);

  tasksDone++;
  tasksRemaining = tasksAdded - tasksDone;
  counterChange();
};

const taskTrash = (param) => {
  document.getElementById(param).remove();
  tasksDone > 0 ? tasksDone-- : 0;
  tasksAdded > 0 ? tasksAdded-- : 0;
  tasksRemaining = tasksAdded - tasksDone;
  counterChange();
};

clear.addEventListener("click", function () {
  list.innerHTML = "";
  ID = 0;
  tasksAdded = 0;
  tasksDone = 0;
  tasksRemaining = 0;
  counterChange();
});

add_to_do.addEventListener("click", function () {
  const toDo = input.value;
  if (toDo) {
    addToDo(toDo, ID);
    input.value = "";
    ID++;
    tasksAdded++;
    tasksRemaining = tasksAdded - tasksDone;
    counterChange();
  }
});

input.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    const toDo = input.value;
    if (toDo) {
      addToDo(toDo, ID);
      input.value = "";
      ID++;
      tasksAdded++;
      tasksRemaining = tasksAdded - tasksDone;
      counterChange();
    }
  }
});
