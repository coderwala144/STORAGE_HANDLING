$(document).ready(function () {
    let tasks = [];
    
    function renderTasks() {
        $('#Add1').empty();
        tasks.forEach(task => {
            let taskHtml = `
                <div class="task-item" data-id="${task.id}">
                    <span class="task-text">${task.text}</span>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
            $('#Add1').append(taskHtml);
        });
    }

    function addTask(taskText) {
        let taskId = 'task-' + Date.now();
        tasks.push({ id: taskId, text: taskText });
        saveTasks(tasks);
        renderTasks();
    }

    function saveTasks(updatedTasks) {
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        console.log('Tasks saved:', updatedTasks);
    }

    $('#button1').click(function () {
        let task = $('#Id1').val().trim();
        if (task) {
            addTask(task);
            $('#Id1').val('');
        } else {
            alert('Please enter a task.');
        }
    });

    $('#Add1').on('click', '.edit-btn', function () {
        let taskItem = $(this).closest('.task-item');
        let taskId = taskItem.data('id');
        let currentTask = taskItem.find('.task-text').text();
        $('#Id1').val(currentTask);
        tasks = tasks.filter(t => t.id !== taskId);
        saveTasks(tasks);
        renderTasks();
    });

    $('#Add1').on('click', '.delete-btn', function () {
        let taskItem = $(this).closest('.task-item');
        let taskId = taskItem.data('id');
        tasks = tasks.filter(t => t.id !== taskId);
        taskItem.remove();
        saveTasks(tasks);
        renderTasks();
    });

    // Load tasks on page load
    tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    renderTasks();
});