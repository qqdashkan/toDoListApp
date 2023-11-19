'use strict';

const taskInput = document.querySelector('.task-input');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const form = document.querySelector('.create-task-form');

const addBtn = document.querySelector('.btn');
const containerBody = document.querySelector('.container');

taskList.classList.add('font');
containerBody.style.margin = '50px';
addBtn.style.marginTop = '20px';


const titles = document.getElementsByTagName('h3');
for (let title of titles) {
    title.classList.add('font');

}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (taskInput.value.trim() === ''){
        return;
    }

    createSingleTaskElement(taskInput.value);

    storeTaskInLocalStorage(taskInput.value);

    form.reset();
})

document.addEventListener('DOMContentLoaded', renderTasks);

taskList.addEventListener('mouseover', (event) => {
    let target = event.target.closest('li');
    if(!target) return;
    target.classList.toggle('color');      
});

taskList.addEventListener('mouseout', (event) => {
    let target = event.target.closest('li');
    if(!target) return;
    target.classList.toggle('color'); 
});

taskList.addEventListener('click', (event) => {
    const iconContainer = event.target.parentElement;
    
    if (iconContainer.classList.contains('delete-item')) {
        iconContainer.parentElement.setAttribute('status', 'delete');
 
        if (confirm('Are you sure?')) {
            let tasks = Array.from(document.querySelectorAll('.collection-item'))
            iconContainer.parentElement.remove();

        tasks.forEach((task, index) => {
            if (task.hasAttribute('status')) {
            tasks.splice(index, 1);
        }
        });

        const newTaskList = tasks.map(task => task.textContent);
        localStorage.setItem('tasks', JSON.stringify(newTaskList))

        }
    }

    if (iconContainer.classList.contains('edit-element')) {
            let newTask = window.prompt('New name', iconContainer.parentElement.textContent);

            if (newTask === null){
                return;
            }
            iconContainer.parentElement.innerHTML = newTask;

            let tasks = Array.from(document.querySelectorAll('.collection-item'));
            const newTaskList = tasks.map(task => task.textContent);
            localStorage.setItem('tasks', JSON.stringify(newTaskList));
        }


})


clearBtn.addEventListener('click', () => {
    if(confirm('Are you sure?')){
        localStorage.clear();
        taskList.innerHTML = '';
    }
})


function createSingleTaskElement(newTask) {
const li = document.createElement('li');
li.className = 'collection-item';
li.appendChild(document.createTextNode(newTask));

const deleteElement = document.createElement('span');
deleteElement.className = 'delete-item';
deleteElement.innerHTML = '<i class="fa fa-remove"></i>';

const editElement = document.createElement('span');
editElement.className = 'edit-element';
editElement.innerHTML = '<i class="fa fa-edit"></i>';

li.appendChild(deleteElement);
li.appendChild(editElement);

taskList.appendChild(li);
}

function storeTaskInLocalStorage(newTask) {
    const tasks = localStorage.getItem('tasks') !== null 
    ? JSON.parse(localStorage.getItem('tasks'))
    : [];

tasks.push(newTask);

localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const tasks = localStorage.getItem('tasks') !== null 
    ? JSON.parse(localStorage.getItem('tasks'))
    : [];

    tasks.forEach((task) => {
        createSingleTaskElement(task);
    });

}