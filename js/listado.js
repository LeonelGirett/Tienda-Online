let tasks = []; // crea un array vacio (listas)
let netxId = 1;

const form = document.querySelector(".form_task"); // Formulario
const taskInput = document.querySelector("#taskInput"); // Input
const taskColor = document.querySelector("#taskColor");
const taskList = document.querySelector("#taskList"); // Lista de li

// Muestrar las tareas en el HTML
const renderTasks = () => {
    taskList.innerHTML = ""; // Borrar toda la informacion del ul
    tasks.forEach((task) => {
        // Dinamico con el texto ingresado en el input
        const html = ` 
        <tr data-id="${task.id}" class ="task__item" >
          <td>${task.id}</td>
          <td class="${task.completa ? 'done' : ''}">${task.txt_tarea}</td>
          <td class="${task.completa ? 'done' : ''}">${task.txt_color}</td>
          <td>
            <i class="bx bx-check"></i>
            <i class="bx bx-trash"></i>
          </td>
        </tr>
      `;
      taskList.innerHTML += html;
    })
}


form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const tarea = taskInput.value.trim();
    const color = taskColor.value.trim();

    let erroresValidacion = false;

    if (tarea.length < 5) {
        erroresValidacion = true;
        const error = document.querySelector(".error");
        error.textContent = "El texto de la tarea debe contener al menos 5 caracteres";

        setTimeout(() => {
            error.textContent = "";
        }, 4000);
    }

    if (!erroresValidacion) {
        // Obtener el último ID almacenado
        let lastId = localStorage.getItem("lastId") ? parseInt(localStorage.getItem("lastId")) : 0;
        
        const task = {
            id: ++lastId, // Incrementamos el ID antes de usarlo
            txt_tarea: tarea,
            txt_color: color,
            completa: false,
        };

        tasks.push(task);

        // Actualizar el ID en el localStorage
        localStorage.setItem("lastId", lastId);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        taskInput.value = ""; // Limpiar el campo

        renderTasks(); // Renderizar las tareas
    }
});



taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("bx-check")){

        const id = event.target.closest("tr").dataset.id;

        const task = tasks.find((task) => task.id == id);

        task.completa = !task.completa;
        console.log(task);

        renderTasks();

        event.target.closest("tr").querySelector("td").classList.toggle("done");

        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    // -------------------------------------------
    // BORRAR UNA TAREA

    if(event.target.classList.contains("bx-trash")){
        const id = event.target.closest("tr").dataset.id;
        const taskIndex = tasks.findIndex((task)=> task.id == id);

        tasks.splice(taskIndex, 1);

        localStorage.setItem("tasks", JSON.stringify(tasks));
        event.target.closest("tr").remove();

    }
});


document.addEventListener("DOMContentLoaded", () => {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
     // Si hay productos en localStorage, encontrar el ID más alto y ajustarlo para el próximo ID
   if (tasks.length > 0) {
    nextId = Math.max(...tasks.map((product) => product.id)) + 1;
  }

    renderTasks();
});
