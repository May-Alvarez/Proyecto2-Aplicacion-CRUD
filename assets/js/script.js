// Seleccionar Elementos
const form = document.getElementById('todoForm');
const toDoInput= document.getElementById('nuevaTarea');
const toDoListElement = document.getElementById('toDo-list');
const notificationElement = document.querySelector('.notification');

//Variables
let toDos = JSON.parse(localStorage.getItem('toDos')) || [];
let EditTodoId = -1;

// 1st render
renderToDo();

// Evento submit del Formulario
form.addEventListener('submit', function(event){
    event.preventDefault();
    
    guardarToDo();
    renderToDo();
    localStorage.setItem('toDos', JSON.stringify(toDos));
});

//Funcion GuardarToDo
function guardarToDo(){
    const toDoValue = toDoInput.value

    //Verificar si la tarea esta Duplicada
    const duplicado = toDos.some((toDo) => toDo.value.toUpperCase() === toDoValue.toUpperCase());

    //Verificar si el input esta Vacio
    const isEmpty = toDoValue === '';
    if(isEmpty){
        showNotification("El ToDo esta Vacio");
    }
    else if(duplicado){
        showNotification("La tarea ya Existe");
    }
    else
    {
        if(EditTodoId >= 0){
            toDos = toDos.map((todo, index) => ({
                ...todo,
                value: index === EditTodoId ? toDoValue : todo.value,
            }));
            EditTodoId = -1;
        }else{
            toDos.push({
                value : toDoValue,
                checked : false,
                color: '#' + Math.floor(Math.random() * 16777215).toString(16) //Genera un color random
            });
        }

        toDoInput.value = '';
    }
}

//Funcion Render
function renderToDo(){
    if (toDos.length === 0) {
        toDoListElement.innerHTML = '<center>Nada que hacer!</center>';
        return;
    }
    
      // Limpiar elemento re-render
    toDoListElement.innerHTML = '';

    //Render de las Tareas
    toDos.forEach((toDo, index) => {
        toDoListElement.innerHTML += `
        <div class="todo" id=${index}>
        <i 
            class="bi ${toDo.checked ? 'bi-check-circle-fill' : 'bi-circle'}"
            style="color : ${toDo.color}"
            data-action="check">
        </i>
        <p class="${toDo.checked ? 'checked' : ''}" data-action="check">${toDo.value}</p>
        <i class="bi bi-pencil-square" data-action="edit"></i>
        <i class="bi bi-trash" data-action="delete"></i>
        </div>
        `;
    });
}

// Evento Click para todos los elementos del To Do
toDoListElement.addEventListener('click', (event) => {
    const target = event.target;
    const parentElement = target.parentNode;

    if (parentElement.className !== 'toDos') return;

    // Id de las Tareas
    const todo = parentElement;
    const toDoId = Number(todo.id);

  // target action
    const action = target.dataset.action;

    action === 'check' && checkToDo(toDoId);
    action === 'edit' && editToDo(toDoId);
    action === 'delete' && deleteToDo(toDoId);
});

// Funcion Check
function checkToDo(todoId) {
    toDos = toDos.map((todo, index) => ({
        ...todo,
        checked: index === todoId ? !todo.checked : todo.checked,
    }));
    
    renderToDo();
    localStorage.setItem('todos', JSON.stringify(toDos));
}

// Funcion Editar
function editToDo(todoId) {
    toDoInput.value = toDos[todoId].value;
    EditTodoId = todoId;
}

// Funcion Eliminar
function deleteToDo(todoId) {
    toDos = toDos.filter((todo, index) => index !== todoId);
    EditTodoId = -1;

    // re-render
    renderToDo();
    localStorage.setItem('toDos', JSON.stringify(toDos));
}

  // Mostrar Notificacion
function showNotification(msg) {
    // Cambiar el mensaje
    notificationElement.innerHTML = msg;

    // Notificacion ENTER
    notificationElement.classList.add('notif-enter');
    
    // Permiso - Notificacion
    setTimeout(() => {
        notificationElement.classList.remove('notif-enter');
    }, 2000);
}