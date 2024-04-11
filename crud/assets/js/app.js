const listUsers = document.getElementById('users');
const listTasks = document.getElementById('tasks');
const form = document.getElementById('form-task');
const title = document.getElementById('title');
const completed = document.getElementById('completed');
const formTitle = document.getElementById('form-title');
const buttonSumit = document.getElementById('save');
let idTask;


import { getAllTasks, getAllUsers, createTask, deleteTask, getTask, updateTask } from "./petitions.js";

document.addEventListener("DOMContentLoaded", async () => {
    const tasks = await getAllTasks();
    let templateTasks = "";
    await showUsers();
    for (const task of tasks) {
        templateTasks += `
        <tr>
            <td>${task.id}</td>
            <td>${task.firstname}</td>
            <td>${task.title}</td>
            <td> <input type="checkbox" `;
        if (task.completed) {
            templateTasks += 'checked ';
        }
        templateTasks += `disabled > </td>
            <td>
                <button class="task-update btn btn-secondary btn-sm" value="${task.id}">
                    <span>Update</span> <i class="nf nf-md-pencil"></i>
                </button>
                <button class="task-delete btn btn-danger btn-sm" value="${task.id}">
                    <span>Delete</span> <i class="nf nf-cod-trash"></i>
                </button>
            </td>
        </tr>
        `;
    }
    listTasks.innerHTML = templateTasks;
    // console.log(tasks);
    // console.log(users);
    await getDeleteBtns();
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fordata = new FormData();
    fordata.append("title", title.value);
    fordata.append("idUser", listUsers.value);
    fordata.append("completed", completed.checked);

    if (buttonSumit.value === 'create') {
        await createTask(fordata);
    } else {
        console.log(listUsers.value);
        fordata.append("id", idTask);
        await updateTask(fordata);
    }
    await showTasks();
    formTitle.innerText = 'Insert task';
    completed.checked = 0;
    title.value = '';
    buttonSumit.value = 'create';
});

listUsers.addEventListener("change", async () => {
    await showTasks();
});

async function getDeleteBtns() {
    const deleteBtns = document.querySelectorAll('.task-delete');
    deleteBtns.forEach(button => {
        button.addEventListener('click', async () => {
            const fordata = new FormData();
            fordata.append("id", button.value);
            await deleteTask(fordata);
            await showTasks();
        })
    });

    const updateBtns = document.querySelectorAll('.task-update');
    updateBtns.forEach(button => {
        button.addEventListener('click', async () => {
            const fordata = new FormData();
            fordata.append("id", button.value);
            const task = await getTask(fordata);
            formTitle.innerText = 'Update Task';
            title.value = task[0].title;
            completed.checked = (task[0].completed == 1) ? true : false;
            idTask = task[0].id;
            buttonSumit.value = 'update';
            // console.log(listUsers);
            await showUsers(task[0].idUser);
            await showTasks();
        })
    });

}

async function showTasks() {
    const listUsersUpdate = document.getElementById('users');
    const tasks = await getAllTasks();
    let templateTasks = "";
    // console.log(listUsersUpdate.value);
    for (const task of tasks) {
        if (listUsersUpdate.value == task.idUser) {
            templateTasks += `
                <tr>
                    <td>${task.id}</td>
                    <td>${task.firstname}</td>
                    <td>${task.title}</td>
                    <td> <input type="checkbox" `;
            if (task.completed) {
                templateTasks += 'checked ';
            }
            templateTasks += `disabled > </td>
                    <td>
                        <button class="task-update btn btn-secondary btn-sm" value="${task.id}">
                            <span>Update</span> <i class="nf nf-md-pencil"></i>
                        </button>
                        <button class="task-delete btn btn-danger btn-sm" value="${task.id}">
                            <span>Delete</span> <i class="nf nf-cod-trash"></i>
                        </button>
                    </td>
                </tr>
                `;
        }
        listTasks.innerHTML = templateTasks;
    }
    await getDeleteBtns();
}

async function showUsers(selectedUserId = null) {
    const users = await getAllUsers();
    let templateUsers = `
        <option selected disabled>Select a User</option>
        <hr class="border-dark" />`;
    for (const user of users) {
        templateUsers += ` <option value="${user.id}" `;
        
        if (selectedUserId == user.id) {
            templateUsers += 'selected ';
        }
        templateUsers += `>${user.fullname}</option>`;
    }
    listUsers.innerHTML = templateUsers;
}