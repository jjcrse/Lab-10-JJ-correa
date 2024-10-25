class Tarea {
    constructor(nombre) {
        this.nombre = nombre;
        this.estado = 'pendiente';
    }
}

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

document.getElementById("inputButton").addEventListener("click", crearTareas);

function crearTareas() {
    const inputTarea = document.getElementById("inputText").value.trim();

    if (inputTarea !== '') {
        const tarea = new Tarea(inputTarea);
        tareas.push(tarea);
        document.getElementById("inputText").value = ''; // Limpiar el input
        actualizarLocalStorage();
        vista();
    }
}

function vista() {
    const pendientes = document.getElementById("listaPendiente");
    const enProgreso = document.getElementById("listaEnProgreso");
    const completadas = document.getElementById("listaCompletadas");

    pendientes.innerHTML = '';
    enProgreso.innerHTML = '';
    completadas.innerHTML = '';

    let countPendientes = 0;
    let countEnProgreso = 0;
    let countCompletadas = 0;

    tareas.forEach((tarea, index) => {
        const item = document.createElement("div");
        item.className = 'task';
        item.innerHTML = `
            <p class='titleCard'>${tarea.nombre}</p>
            <div class='taskButtons'>
                ${tarea.estado === 'pendiente' ? `<button onclick="cambiarEstado(${index}, 'progreso')">En progreso</button>` : ''}
                ${tarea.estado === 'progreso' ? `
                    <div class='buttonsSeparate'>
                        <button onclick="cambiarEstado(${index}, 'completado')">Completado</button>
                        <button onclick="cambiarEstado(${index}, 'pendiente')">Pendiente</button>
                    </div>
                ` : ''}
                ${tarea.estado === 'completado' ? "<span>✔️ Completada</span>" : ''}
                <button class="deleteButton" onclick="eliminarTarea(${index})">Eliminar</button>
            </div>
        `;

        if (tarea.estado === "pendiente") {
            pendientes.appendChild(item);
            countPendientes++;
        } else if (tarea.estado === "progreso") {
            enProgreso.appendChild(item);
            countEnProgreso++;
        } else {
            completadas.appendChild(item);
            countCompletadas++;
        }
    });

    document.getElementById("countPendientes").innerText = countPendientes;
    document.getElementById("countEnProgreso").innerText = countEnProgreso;
    document.getElementById("countCompletadas").innerText = countCompletadas;
}

function cambiarEstado(index, nuevoEstado) {
    tareas[index].estado = nuevoEstado;
    actualizarLocalStorage();
    vista();
}

function eliminarTarea(index) {
    tareas.splice(index, 1);
    actualizarLocalStorage();
    vista();
}

function actualizarLocalStorage() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function filtrarTareas() {
    const searchText = document.getElementById("searchText").value.toLowerCase();
    const tareasDivs = document.querySelectorAll(".task");

    tareasDivs.forEach(task => {
        const taskName = task.querySelector('.titleCard').textContent.toLowerCase();
        task.style.display = taskName.includes(searchText) ? "block" : "none";
    });
}

window.onload = vista;
