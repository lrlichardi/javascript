const formularioNota = document.getElementById('formularioNotaInput');
const titulo = document.getElementById('tituloInput');
const nota = document.getElementById('notaInput');
const tNota = document.getElementById('tNotaInput');
const tablaNota = document.getElementById('tabla');
const editForm = document.getElementById('formularioEditar');
const editTitulo = document.getElementById('editarTitulo');
const editNota = document.getElementById('editarNota');
const editCategoria = document.getElementById('editarCategoria');
const buscarForm = document.getElementById('formBuscar');
const json = localStorage.getItem('miNota'); // Traer de localStorage el dato asociado a la key "miNota".
let miNota = JSON.parse(json) || []; // Convertir datos de un string JSON a código JavaScript.
let notaId = '';


function generarID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};

formularioNota.onsubmit = function (e) {
    e.preventDefault();
    const notaNueva = {
        id: generarID(),
        titulo: titulo.value,
        nota: nota.value,
        tnota: tNota.value,
        registro: Date.now(),

    };
    miNota.push(notaNueva);
    const json = JSON.stringify(miNota); // Convertir datos a un string JSON.
    console.log(json);
    localStorage.setItem('miNota', json); // Guardar en localStorage un dato asociado a la key "miNota".
    mostrarNotas();
    formularioNota.reset(); // reset limpia los campos del formulario.
    // Ocultar el modal con las funciones incluidas en bootstrap.
    const modalDiv = document.getElementById('exampleModal');
    const modalBootstrap = bootstrap.Modal.getInstance(modalDiv);
    modalBootstrap.hide();
};
console.log(miNota);

// mostrar nota nueva en tabla 
function mostrarNotas() {
    const fila = [];
    for (var i = 0; i < miNota.length; i++) {
        const nota1 = miNota[i];
        const fecha = new Date(nota1.registro);
        const tr = `
    <tr>
    <td>${nota1.titulo}</td>
    <td>${nota1.nota}</td>
    <td>${nota1.tnota}</td>
    <td>${fecha.toLocaleString()}</td>
    <td>
                    <button onclick="detalleNota('${nota1.id}')" type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target=".modalDetalle">Ver detalle</button>
                    <button onclick="cargarModalEditar('${nota1.id}')" type="button" class="btn btn-success btn-sm" data-bs-toggle="modal"
                    data-bs-target="#modalEditar">Editar</button>
                    <button onclick="eliminarNota('${nota1.id}')" class="btn btn-danger btn-sm">Eliminar</button>
                </td>
            </tr>
        
  </tr> `;
        fila.push(tr);
    }
    tablaNota.innerHTML = fila.join('');

}



function eliminarNota(id) {
    const confirmar = confirm('Confirme para eliminar nota');
    if (!confirmar) {
        return console.log("cancelo!");
    }
    let notaFiltradas = [];
    for (let i = 0; i < miNota.length; i++) {
        const nota = miNota[i]
        const coincideid = nota.id === id;
        if (!coincideid) {
            notaFiltradas.push(nota);
        }
    }
    const json = JSON.stringify(notaFiltradas);
    localStorage.setItem('miNota', json);
    miNota = notaFiltradas;
    console.log("Se borro exitosamente");
    mostrarNotas();
}

// funcion detalle
function detalleNota(id) {
    mostrarNota = miNota.find((notaNueva) => notaNueva.id === id);
    const divDetalle2 = document.getElementById('detalleNota2');
    const notaDetalle2 = `   
   <h1>Titulo: ${mostrarNota.titulo}</h1>
   `;
    const divDetalle = document.getElementById('detalleNota');
    const notaDetalle = `
    <p>Nota: ${mostrarNota.nota}</p>
    <p>Categoria: ${mostrarNota.tnota}</p>
    `;
    divDetalle.innerHTML = notaDetalle;
    divDetalle2.innerHTML = notaDetalle2;

}
// editar modal 
function cargarModalEditar(id) {
    const notaBuscada = miNota.find((notaNueva) => notaNueva.id === id);
    editTitulo.value = notaBuscada.titulo;
    editNota.value = notaBuscada.nota;
    editCategoria.value = notaBuscada.tnota;
    notaId = notaBuscada.id;
}

function editarNota(e) {
    e.preventDefault();
    const notaModificada = miNota.map((notaNueva) => {
        if (notaNueva.id === notaId) {
            const notaModificada = {
                ...notaNueva,
                titulo: editTitulo.value,
                nota: editNota.value,
                tnota: editCategoria.value,
            };
            return notaModificada;
        } else {
            return notaNueva;
        }
    }
    )
    // convierte en string un array para poder ser almacenado
    const json = JSON.stringify(notaModificada);
    // asigna el valor de json a Minota en el localstorage
    localStorage.setItem('miNota', json);
    miNota = notaModificada;
    mostrarNotas();
    console.log("La nota se modifico correctamente");
    // para cerrar modal
    const modalDiv = document.getElementById('modalEditar');
    const modalBootstrap = bootstrap.Modal.getInstance(modalDiv);
    modalBootstrap.hide();
};

// buscar nota!
const notaBuscada = (e) => {
    e.preventDefault();
    const notaLocal = JSON.parse(localStorage.getItem('miNota')) || [];
    const buscarNotaInput = document.getElementById('buscarNota');
    const termino = buscarNotaInput.value.toLowerCase();
    console.log(termino);
    const notaFiltradas = notaLocal.filter((notaNueva) => {
        const nombreEnMinuscula = notaNueva.titulo.toLowerCase();
        return nombreEnMinuscula.includes(termino);
    });
    console.log('buscando');
    miNota = notaFiltradas;
    mostrarNotas();
    // condicional
    const alerta = document.getElementById('alertaBusqueda');
    if (notaFiltradas.length === 0){
        alerta.classList.remove('d-none');
    }
    else{
        alerta.classList.add('d-none');
    }
}

editForm.onsubmit = editarNota;
buscarForm.onsubmit = notaBuscada;

mostrarNotas();

