// Rescata elemento contenedor general
const listaTarea = document.getElementById('listaTareas');

// Ejecución eventos
eventListeners();

function eventListeners() {
  //Cuando se envia el formulario
  document.getElementById('enviarTarea').addEventListener('click', agregarTarea);
  // Borrar tareas
  document.addEventListener('click', borrarTarea);
  // Contenido cargado
  document.addEventListener('DOMContentLoaded', localStorageListo);
}

// Funciones

//Generar elementos del DOM
function generarDom(mensaje){
  // Crear elementos
  const itemTarea = document.createElement('div');
  const parrafo = document.createElement('p');
  const textTarea = document.createTextNode(mensaje);
  const botonBorrar = document.createElement('button');
  const textBoton = document.createTextNode('X')

  // añadir atributos a elementos
  itemTarea.setAttribute('class', 'col-12')
  parrafo.setAttribute('class', 'd-inline-block')
  botonBorrar.setAttribute('class','btn btn-dark');

  //Añade texto al boton
  botonBorrar.appendChild(textBoton);
  // añade la tarea al parrafo
  parrafo.appendChild(textTarea);
  // añade el tweet a la lista
  itemTarea.appendChild(parrafo);
  // añade el botón de borrar al tweet
  itemTarea.appendChild(botonBorrar);
  // añade item con tarea y boton a contenedor padre
 listaTarea.appendChild(itemTarea);
}

// Añadir tareas al documento
function agregarTarea() {
  // leer el valor del textarea
  const tareas = document.getElementById('crearTarea').value;
  //Crear elementos en el DOM
  generarDom(tareas)
  // Añadir a Local Storage
  agregarTareasLocalStorage(tareas);
}

// Elimina tarea del DOM
function borrarTarea(e) {
  if(e.target.className === 'btn btn-dark') {
      e.target.parentElement.remove();
      borrarTareasLocalStorage(e.target.parentElement.innerText);   
  }
}

// Mostrar datos de localStorage en la página
function localStorageListo() {
  let tareas;
  tareas = obtenerTareasLocalStorage();
  tareas.forEach(function(mensaje) {
      generarDom(mensaje);      
  });
}

 //Agrega tarea a local storage
function agregarTareasLocalStorage(textoTarea) {
  let tareas = obtenerTareasLocalStorage();
  // Añadir la tarea al arreglo
  tareas.push(textoTarea);
  // Convertir de arreglo a string para añadir a local storage
  localStorage.setItem('tareas', JSON.stringify(tareas) );
}

// Comprobar que haya elementos en local storage, retorna un arreglo
function obtenerTareasLocalStorage() {
  let tareas;
  // Revisamos los valores de local storage
  if(localStorage.getItem('tareas') === null) {
      tareas = []; 
  } else {
      tareas = JSON.parse(localStorage.getItem('tareas'));
  }
  return tareas;
}

// Eliminar tareas de Local Storage
function borrarTareasLocalStorage(tarea) {
  // Elimina la X de la tarea
  //la función recibe todo el texto de la tarea más la X y procede a cortar el texto, dejando solo el texto de la tarea, para eliminarla del localStorage
  let borrarTarea = tarea.substring(0, tarea.length - 1); 
  let tareas = obtenerTareasLocalStorage();
  //en el forEach, compara la tarea recibida con lo existente en local storage y quita la tarea a eliminar
  tareas.forEach(function(textoArr, index) {
      if(borrarTarea === textoArr) {
            tareas.splice(index, 1);
      }
  })
  //convierte el arreglo nuevo (con la tarea eliminada) en string para volver a guardarlo en local storage
  localStorage.setItem('tareas', JSON.stringify(tareas));
}