const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const tasks = document.getElementById("tasks-list");

let tasksArray = [];
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

    createTaskItem();
}

function createTaskItem() {
    tasks.innerHTML = "";
    tasksArray.forEach((obj, i) => {
        let taskItem = document.createElement("li");
        taskItem.classList.add("task");
        taskItem.setAttribute("data-id", obj.id);
        taskItem.innerText = obj.name;
        tasks.appendChild(taskItem);

        let removeIcon = document.createElement("span");
        removeIcon.innerHTML = "&#10006;";
        taskItem.appendChild(removeIcon);
        removeIcon.onclick = function (){deletefromlocalStorage(i)};
    });

    tasks.onclick = function (e) {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
        }
    };
}
createTaskItem();

function deletefromlocalStorage(i) {
    tasksArray.splice(i, 1);
    localStorage.setItem("myTasks", JSON.stringify(tasksArray));
    createTaskItem();
}
