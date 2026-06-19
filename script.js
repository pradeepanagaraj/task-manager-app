const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const taskCounter = document.getElementById("taskCounter");
const taskInput = document.getElementById("taskInput");
const totalTasks = document.getElementById("totalTasks");
const activeTasks = document.getElementById("activeTasks");
const completedTasks = document.getElementById("completedTasks");

function updateStats() {
    let total = tasks.length;
    let active = tasks.filter(task => !task.completed).length;
    let completed = tasks.filter(task => task.completed).length;

    totalTasks.textContent = `📋 Total: ${total}`;
    activeTasks.textContent = `⏳ Active: ${active}`;
    completedTasks.textContent = `✅ Completed: ${completed}`;
}

const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const allBtn = document.getElementById("allBtn");
const activeBtn = document.getElementById("activeBtn");
const completedBtn = document.getElementById("completedBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

renderTasks();

addBtn.addEventListener("click", addTask);
allBtn.addEventListener("click", () => {
    currentFilter = "all";
    renderTasks();
});
activeBtn.addEventListener("click", () => {
    currentFilter = "active";
    renderTasks();
});
completedBtn.addEventListener("click", () => {
    currentFilter = "completed";
    renderTasks();
});

function addTask() {
    const text = taskInput.value.trim();

    if (text === "") return;

    tasks.push({
        text: text,
        completed: false
    });

    taskInput.value = "";
    saveTasks();
    renderTasks();
    showToast("Task Added!");
}

function renderTasks() {
    taskList.innerHTML = "";

   if (tasks.length === 0) {
    taskList.innerHTML = `
<h3>No tasks yet 🚀</h3>
<p>Add your first task and start being productive!</p>
`;
    updateCounter();
    updateStats();
    updateProgress();
    return;
}

    let filteredTasks = tasks.filter(task => {
        if (currentFilter === "active") return !task.completed;
        if (currentFilter === "completed") return task.completed;
        return true;
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? "completed" : ""}">
                ${task.text}
            </span>
        <button class="done-btn" onclick="toggleTask(${index})">
${task.completed ? "↺ Undo" : "✅ Done"}
</button>
<button class="edit-btn" onclick="editTask(${index})">✏️ Edit</button>
<button class="delete-btn" onclick="deleteTask(${index})">🗑 Delete</button>
        `;

        taskList.appendChild(li);
    });
    updateCounter();
    updateStats();
    updateProgress();

}


function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
    updateCounter();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
    updateCounter();
}

function editTask(index) {
    let newText = prompt("Edit task:", tasks[index].text);

    if (newText && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
        updateCounter();
    }
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function updateCounter() {
    let activeCount = tasks.filter(task => !task.completed).length;
    taskCounter.textContent = `Tasks Left: ${activeCount}`;
}
function updateStats() {
    let total = tasks.length;
    let active = tasks.filter(task => !task.completed).length;
    let completed = tasks.filter(task => task.completed).length;

    totalTasks.textContent = `📋 Total: ${total}`;
    activeTasks.textContent = `⏳ Active: ${active}`;
    completedTasks.textContent = `✅ Completed: ${completed}`;
}
function updateProgress() {
    let total = tasks.length;
    let completed = tasks.filter(task => task.completed).length;

    let percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    progressBar.style.width = percent + "%";
   
    progressText.textContent = `Progress: ${percent}%`;
     
    if (total > 0 && completed === total) {
        showToast("🎉 All tasks completed!");
    }
}
function showToast(message) {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.style.display = "block";

    setTimeout(() => {
        toast.style.display = "none";
    }, 2000);
}
   

 
