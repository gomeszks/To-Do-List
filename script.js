const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    list.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.done) li.classList.add('done');

    li.innerHTML = `
        <div class="task-text">${task.title}</div>
        <div class="actions">
        <button class="done-btn" onclick="toggleDone(${index})">${task.done ? 'Desfazer' : 'Concluir'}</button>
        <button class="delete-btn" onclick="deleteTask(${index})">Excluir</button>
        </div>
    `;
    list.appendChild(li);
    });
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const title = input.value.trim();
    if (title !== '') {
    tasks.push({ title, done: false });
    saveTasks();
    renderTasks();
    input.value = '';
    }
});

function toggleDone(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

renderTasks();

