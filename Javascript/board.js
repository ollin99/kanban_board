document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.querySelector('.add-task');
    const modal = document.getElementById('taskModal');
    const closeButton = document.querySelector('.close-button');
    const taskForm = document.getElementById('taskForm');
    const taskTitleInput = document.getElementById('taskTitle');
    const taskDescriptionInput = document.getElementById('taskDescription');
    const taskOwnerInput = document.getElementById('taskOwner');
    const columns = document.querySelectorAll('.column .task-list');


     // Öppna formulär när "Add Task" klickas och stäng formulär när krysset klickas på 
     addTaskButton.addEventListener('click', () => {
        modal.style.display = 'flex';
    });
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });



    // Funktion för att skapa ett nytt kort
    function createTaskCard(title, descriptionText, ownerText, columnId = 'todo') {
        const newTaskCard = document.createElement('div');
        newTaskCard.classList.add('task-card');
        newTaskCard.style.position = "relative";

        // Skapandet av kortinnehåll
        newTaskCard.innerHTML = `
            <div class="task-controls">
            <p class="owner"><strong>Owner: ${ownerText}</strong></p>
                <button class="move-left">←</button>
                <button class="move-right">→</button>
            </div>
            
            <h3>${title}</h3>
            <div class="description-container">
                <p class="description">${descriptionText}</p>
                <button class="toggle-description">Show more</button>
            </div>
            
            <button class="delete-task">Delete</button>
        `;

        const column = document.getElementById(columnId).querySelector('.task-list');
        column.appendChild(newTaskCard);

        saveTasksToLocalStorage();

       
        // Kod för Show more och show less
        const newToggleButton = newTaskCard.querySelector('.toggle-description');
        const newDescription = newTaskCard.querySelector('.description');
        
        if (newDescription.scrollHeight > 70) {
            newToggleButton.style.display = 'block';
        } else {
            newToggleButton.style.display = 'none';
        }
        newToggleButton.addEventListener('click', () => {
            newDescription.classList.toggle('expanded');
            newToggleButton.textContent = newDescription.classList.contains('expanded') ? 'Show less' : 'Show more';
        });

        //Kod för att flytta kortet mellan kolumnerna
        const moveLeftButton = newTaskCard.querySelector('.move-left');
        const moveRightButton = newTaskCard.querySelector('.move-right');

        moveLeftButton.addEventListener('click', () => {
            const currentColumn = newTaskCard.parentElement;
            const prevColumn = currentColumn.closest('.column').previousElementSibling?.querySelector('.task-list');
            if (prevColumn) {
                prevColumn.appendChild(newTaskCard)
                saveTasksToLocalStorage();
            };
        });
        moveRightButton.addEventListener('click', () => {
            const currentColumn = newTaskCard.parentElement;
            const nextColumn = currentColumn.closest('.column').nextElementSibling?.querySelector('.task-list');
            if (nextColumn) {
                nextColumn.appendChild(newTaskCard)
                saveTasksToLocalStorage();
            };
        });
 
        // Funktion för att radera kort
        const deleteButton = newTaskCard.querySelector('.delete-task');
        deleteButton.addEventListener('click', () => {
            newTaskCard.remove();
            saveTasksToLocalStorage();
        });

       
}

    // Spara tasks till localStorage
    function saveTasksToLocalStorage() {
    const tasks = [];
    columns.forEach(column => {
        const tasksInColumn = Array.from(column.querySelectorAll('.task-card')).map(task => ({
            title: task.querySelector('h3').textContent,
            description: task.querySelector('.description').textContent,
            owner: task.querySelector('.owner').textContent, 
            column: column.closest('.column').id
        }));
        tasks.push(...tasksInColumn);
    });
    localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
    }
    // Ladda tasks från localStorage
    function loadTasksFromLocalStorage() {
    const savedTasks = JSON.parse(localStorage.getItem('kanbanTasks')) || [];
    savedTasks.forEach(task => {
        createTaskCard(task.title, task.description, task.owner, task.column);
    });
    }

    loadTasksFromLocalStorage();

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

     // Hantera formulärskickning och skapa nytt kort
     taskForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        const title = taskTitleInput.value;
        const description = taskDescriptionInput.value;
        const owner = taskOwnerInput.value;
        createTaskCard(title, description, owner); 
        taskTitleInput.value = '';  
        taskDescriptionInput.value = '';  
        taskOwnerInput.value = '';
        modal.style.display = 'none'; 
        saveTasksToLocalStorage();
    });


});