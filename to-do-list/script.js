document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const taskStats = document.getElementById('taskStats');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}" onclick="toggleTaskCompletion(${index})">${task.text}</span>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            `;
            taskList.appendChild(li);
        });
        updateTaskStats();
    }

    // Update task statistics
    function updateTaskStats() {
        const completedTasks = tasks.filter(task => task.completed).length;
        taskStats.innerHTML = `Total tasks: ${tasks.length} | Completed: ${completedTasks}`;
    }

    // Add new task
    function addTask(text) {
        tasks.push({ text, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    // Delete task
    function deleteTask(index) {
        if (confirm('Are you sure you want to delete this task?')) {
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    }

    // Toggle task completion
    function toggleTaskCompletion(index) {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    // Handle task input
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && taskInput.value.trim() !== '') {
            addTask(taskInput.value.trim());
            taskInput.value = '';
        }
    });

    // Initial render
    renderTasks();

    // Event delegation for toggle task completion
    taskList.addEventListener('click', function(event) {
        if (event.target.tagName === 'SPAN') {
            const index = Array.from(event.target.parentNode.parentNode.children).indexOf(event.target.parentNode);
            toggleTaskCompletion(index);
        }
    });

    // Event delegation for delete button
    taskList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const index = Array.from(event.target.parentNode.parentNode.children).indexOf(event.target.parentNode);
            deleteTask(index);
        }
    });
});
