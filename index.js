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

var id = 0;
var todoList = [];
var tasksAdded = 0;
var tasksDone = 0;
var tasksRemaining = 0;

const counterChange = () => {
  TODO.children[1].innerHTML = tasksAdded;
  TODODone.children[1].innerHTML = tasksDone;
  TODORemaining.children[1].innerHTML = tasksRemaining;
};

const restoreToDo = () => {
  let data = localStorage.getItem("TODO");
  if (data) {
    todoList = JSON.parse(data);
    id = todoList.length;
    tasksAdded = todoList.length;
    tasksDone = 0;
    loadToDo(todoList);
  } else {
    id = 0;
    todoList = [];
    tasksAdded = 0;
    tasksDone = 0;
    tasksRemaining = 0;
  }
};

const loadToDo = (array) => {
  array.forEach((element) => {
    if (element.done) tasksDone++;
    addToDo(element.name, element.id, element.done, false);
  });
};

const addToDo = (toDo, id, done, update) => {
  const position = "beforeend";
  var item;
  if (done) {
    item = `<li id="${id}" class="task-card task-done">
              <i class="fas ${CHECK} fa-2x py-1 me-2"></i>
              <span class="flex-grow-1 ${LINE_THROUGH}">${toDo}</span>
              <i class="fas fa-trash-alt fa-2x py-1 ms-2" onclick="removeToDo(this.parentNode.id)"></i>
            </li>`;
  } else {
    item = `<li id="${id}" class="task-card task-added">
              <i class="far ${UNCHECK} fa-2x py-1 me-2" onclick="completeToDo(this.parentNode, this)" onmouseover="hoverColor(this.parentNode.id, '#e8960f')" onmouseout="hoverColor(this.parentNode.id, '#ebba2e')"></i>
              <span class="flex-grow-1">${toDo}</span>
              <i class="fas fa-trash-alt fa-2x py-1 ms-2" onclick="removeToDo(this.parentNode.id)"></i>
            </li>`;
  }

  list.insertAdjacentHTML(position, item);
  if (update) {
    todoList.push({
      name: toDo,
      id: id,
      done: done,
    });
    tasksAdded++;
  }

  tasksRemaining = tasksAdded - tasksDone;
  counterChange();

  localStorage.setItem("TODO", JSON.stringify(todoList));
};

const hoverColor = (id, color) => {
  document.getElementById(id).style.borderColor = color;
};

const completeToDo = (parentNode, node) => {
  node.removeAttribute("onmouseout", "onmouseover");
  document.getElementById(parentNode.id).style.borderColor = "#6faf04";
  parentNode.classList.add(TASK_DONE);
  parentNode.classList.remove(TASK_ADDED);
  parentNode.children[1].classList.add(LINE_THROUGH);
  node.classList.add("fas", CHECK);
  node.classList.remove("far", UNCHECK);

  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id == parentNode.id && todoList[i].done == false) {
      todoList[i].done = true;
      tasksDone++;
    }
  }
  localStorage.setItem("TODO", JSON.stringify(todoList));

  tasksRemaining = tasksAdded - tasksDone;
  counterChange();
};

const removeListToDo = (param) => {
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id == param) todoList.splice(i, 1);
  }
};

const removeToDo = (param) => {
  document.getElementById(param).remove();

  removeListToDo(param);
  localStorage.setItem("TODO", JSON.stringify(todoList));

  tasksDone > 0 ? tasksDone-- : 0;
  tasksAdded > 0 ? tasksAdded-- : 0;
  tasksRemaining = tasksAdded - tasksDone;
  counterChange();
};

clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

add_to_do.addEventListener("click", function () {
  const toDo = input.value;
  if (toDo) {
    addToDo(toDo, id, false, true);
    input.value = "";
    id++;
  }
});

input.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    const toDo = input.value;
    if (toDo) {
      addToDo(toDo, id, false, true);
      input.value = "";
      id++;
    }
  }
});

window.onload = restoreToDo();
