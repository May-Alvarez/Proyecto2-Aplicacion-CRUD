// Seleccionar Elementos
const form = document.getElementById('todoForm');
const toDoInput= document.getElementById('nuevaTarea');

//Variables
let toDos = [];

// Evento submit del Formulario
form.addEventListener('submit', function(event){
    event.preventDefault();
    
    guardarToDo();
    
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
        toDos.push({
            value : toDoValue,
            checked : false,
            color : '#' + Math.floor(Math.random()*16777215).toString(26) //Genera un color random
        });
        toDoInput.value = '';
    }
}