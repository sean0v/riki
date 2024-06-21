document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const todoList = document.getElementById('todo-list');
    const inProgressList = document.getElementById('in-progress-list');
    const doneList = document.getElementById('done-list');
    const editTaskForm = document.getElementById('edit-task-form');
    let currentTask = null;

    // Load tasks from localStorage
    loadTasks();

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskName = document.getElementById('task-name').value;
        const taskPriority = getSelectedStars('task-priority');
        const taskDeadline = document.getElementById('task-deadline').value;
        const taskColor = document.getElementById('task-color').value;
        addTask(taskName, taskPriority, taskDeadline, taskColor);
        taskForm.reset();
        const taskModalElement = document.getElementById('taskModal');
        const taskModal = bootstrap.Modal.getInstance(taskModalElement);
        taskModal.hide();
        saveTasks();
    });

    editTaskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskName = document.getElementById('edit-task-name').value;
        const taskPriority = getSelectedStars('edit-task-priority');
        const taskDeadline = document.getElementById('edit-task-deadline').value;
        const taskColor = document.getElementById('edit-task-color').value;
        updateTask(currentTask, taskName, taskPriority, taskDeadline, taskColor);
        const editTaskModalElement = document.getElementById('editTaskModal');
        const editTaskModal = bootstrap.Modal.getInstance(editTaskModalElement);
        editTaskModal.hide();
        saveTasks();
    });

    function addTask(name, priority, deadline, color) {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.style.borderLeft = `25px solid ${color}`;
        li.innerHTML = `
            <span class="drag-handle">☰</span>
            <span>${name} (${getStarsString(priority)}) ${deadline ? `- Due: ${deadline}` : ''}</span>
            <div>
                <button class="btn btn-sm btn-outline-secondary edit-btn">✏️</button>
                <button class="btn btn-sm btn-outline-secondary move-btn">➡️</button>
                <button class="btn btn-sm btn-outline-danger delete-btn">🗑️</button>
            </div>
        `;
        todoList.appendChild(li);

        li.querySelector('.edit-btn').addEventListener('click', function() {
            openEditModal(li, name, priority, deadline, color);
        });

        li.querySelector('.delete-btn').addEventListener('click', function() {
            li.remove();
            saveTasks();
        });

        li.querySelector('.move-btn').addEventListener('click', function() {
            if (todoList.contains(li)) {
                inProgressList.appendChild(li);
            } else if (inProgressList.contains(li)) {
                doneList.appendChild(li);
                li.querySelector('.move-btn').remove();
            }
            saveTasks();
        });
    }

    function openEditModal(task, name, priority, deadline, color) {
        currentTask = task;
        document.getElementById('edit-task-name').value = name;
        setSelectedStars('edit-task-priority', priority);
        document.getElementById('edit-task-deadline').value = deadline;
        document.getElementById('edit-task-color').value = color;
        const editTaskModal = new bootstrap.Modal(document.getElementById('editTaskModal'));
        editTaskModal.show();
    }

    function updateTask(task, name, priority, deadline, color) {
        task.querySelector('span:not(.drag-handle)').textContent = `${name} (${getStarsString(priority)}) ${deadline ? `- Due: ${deadline}` : ''}`;
        task.style.borderLeft = `25px solid ${color}`;
    }

    function saveTasks() {
        const tasks = {
            todo: [],
            inProgress: [],
            done: []
        };

        todoList.querySelectorAll('.list-group-item').forEach(task => {
            tasks.todo.push(getTaskData(task));
        });

        inProgressList.querySelectorAll('.list-group-item').forEach(task => {
            tasks.inProgress.push(getTaskData(task));
        });

        doneList.querySelectorAll('.list-group-item').forEach(task => {
            tasks.done.push(getTaskData(task));
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (!tasks) return;

        todoList.innerHTML = '';
        inProgressList.innerHTML = '';
        doneList.innerHTML = '';

        tasks.todo.forEach(task => addTaskToList(task, todoList));
        tasks.inProgress.forEach(task => addTaskToList(task, inProgressList));
        tasks.done.forEach(task => addTaskToList(task, doneList, true));
    }

    function addTaskToList(task, list, removeMoveBtn = false) {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.style.borderLeft = `25px solid ${task.color}`;
        li.innerHTML = `
            <span class="drag-handle">☰</span>
            <span>${task.name} (${getStarsString(task.priority)}) ${task.deadline ? `- Due: ${task.deadline}` : ''}</span>
            <div>
                <button class="btn btn-sm btn-outline-secondary edit-btn">✏️</button>
                <button class="btn btn-sm btn-outline-secondary move-btn">➡️</button>
                <button class="btn btn-sm btn-outline-danger delete-btn">🗑️</button>
            </div>
        `;
        list.appendChild(li);

        li.querySelector('.edit-btn').addEventListener('click', function() {
            openEditModal(li, task.name, task.priority, task.deadline, task.color);
        });

        li.querySelector('.delete-btn').addEventListener('click', function() {
            li.remove();
            saveTasks();
        });

        if (removeMoveBtn) {
            li.querySelector('.move-btn').remove();
        } else {
            li.querySelector('.move-btn').addEventListener('click', function() {
                if (todoList.contains(li)) {
                    inProgressList.appendChild(li);
                } else if (inProgressList.contains(li)) {
                    doneList.appendChild(li);
                    li.querySelector('.move-btn').remove();
                }
                saveTasks();
            });
        }
    }

    function getTaskData(task) {
        const taskText = task.querySelector('span:not(.drag-handle)').textContent;
        const name = taskText.split(' (')[0];
        const priorityMatch = taskText.match(/\((\★+)\)/);
        const priority = priorityMatch ? priorityMatch[1].length : 0;
        const deadlineMatch = taskText.match(/- Due: (.+)$/);
        const deadline = deadlineMatch ? deadlineMatch[1] : '';
        const color = task.style.borderLeftColor;
        return { name, priority, deadline, color };
    }

    function getSelectedStars(containerId) {
        const stars = document.getElementById(containerId).querySelectorAll('.star.selected');
        return stars.length;
    }

    function setSelectedStars(containerId, count) {
        const stars = document.getElementById(containerId).querySelectorAll('.star');
        stars.forEach((star, index) => {
            if (index < count) {
                star.src = 'https://img.icons8.com/?size=100&id=8ggStxqyboK5&format=png&color=000000';
                star.classList.add('selected');
                star.style.width = '16px';  // Уменьшенный размер
                star.style.height = '16px'; // Уменьшенный размер
            } else {
                star.src = 'https://img.icons8.com/?size=100&id=19295&format=png&color=000000';
                star.classList.remove('selected');
                star.style.width = '16px';  // Уменьшенный размер
                star.style.height = '16px'; // Уменьшенный размер
            }
        });
    }

    function getStarsString(count) {
        return '★'.repeat(count);
    }

    document.querySelectorAll('.star-rating').forEach(container => {
        container.addEventListener('click', function(event) {
            if (event.target.classList.contains('star')) {
                const value = event.target.getAttribute('data-value');
                setSelectedStars(container.id, value);
            }
        });
    });
});
