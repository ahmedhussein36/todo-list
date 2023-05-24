const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const tasks = document.getElementById("tasks-list");

let tasksArray;
if (localStorage.getItem("myTasks")) {
    tasksArray = JSON.parse(localStorage.getItem("myTasks"));
} else {
    tasksArray = [];
}

addBtn.addEventListener("click", createNewTask);

function createNewTask() {
    if (input.value !== "") {
        addTaskToArray();
        input.value = "";
    }
}

function addTaskToArray() {
    let newTask = {
        id: Date.now(),
        name: input.value,
        checked: false,
    };

    tasksArray.push(newTask);

    localStorage.setItem("myTasks", JSON.stringify(tasksArray));

    createTaskItem(newTask);
}

function createTaskItem(task) {
    let taskItem = document.createElement("li");
    taskItem.classList.add("task");
    taskItem.setAttribute("data-id", task.id);
    taskItem.innerText = task.name;

    if (task.checked) {
        taskItem.classList.add("checked");
    }

    tasks.appendChild(taskItem);

    let removeIcon = document.createElement("span");
    removeIcon.innerHTML = "&#10060;";
    taskItem.appendChild(removeIcon);
    removeIcon.onclick = function () {
        deletefromlocalStorage(task.id);
    };

    taskItem.onclick = function () {
        taskItem.classList.toggle("checked");
        task.checked = !task.checked;
        localStorage.setItem("myTasks", JSON.stringify(tasksArray));
    };
}

function deletefromlocalStorage(id) {
    tasksArray = tasksArray.filter((task) => task.id !== id);
    localStorage.setItem("myTasks", JSON.stringify(tasksArray));
    createTaskList();
}

function createTaskList() {
    tasks.innerHTML = "";
    tasksArray.forEach((task) => {
        createTaskItem(task);
    });
}

createTaskList();
