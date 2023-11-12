// Seleccionar Elementos
const form = document.getElementById('todoForm');
const toDoInput= document.getElementById('nuevaTarea');
const toDoListElement = document.getElementById('toDo-list');

//Variables
let toDos = [];
let EditTodoId = -1;

// 1st render
renderToDo();

// Evento submit del Formulario
form.addEventListener('submit', function(event){
    event.preventDefault();
    
    guardarToDo();
    renderToDo();
});

//Funcion GuardarToDo
function guardarToDo(){
    const toDoValue = toDoInput.value

    //Verificar si la tarea esta Duplicada
    const duplicado = toDos.some((toDo) => toDo.value.toUpperCase() === toDoValue.toUpperCase());

    //Verificar si el input esta Vacio
    const isEmpty = toDoValue === '';
    if(isEmpty){
        alert("El ToDo esta Vacio");
    }
    else if(duplicado){
        alert("La tarea ya Existe");
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
                color : '#' + Math.floor(Math.random()*16777215).toString(26) //Genera un color random
            });
        }

        toDoInput.value = '';
    }
}

//Funcion Render
function renderToDo(){
    //Limpiar Elementos

    toDoListElement.innerHTML = "";

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