const formularioNota = document.getElementById('formularioNotaInput');
const titulo = document.getElementById('tituloInput');
const nota = document.getElementById('notaInput');
const tNota = document.getElementById('tNotaInput');
const tablaNota = document.getElementById('tabla');
const json = localStorage.getItem('miNota'); // Traer de localStorage el dato asociado a la key "usuarios".
const usuarios = JSON.parse(json) || []; // Convertir datos de un string JSON a código JavaScript.
let miNota = [];



function generarID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};

formularioNota.onsubmit = function (e) {
    e.preventDefault();
    const notanueva = {
        id: generarID(),
        titulo: titulo.value,
        nota: nota.value,
        tnota: tNota.value,
    }
    miNota.push(notanueva);
    const json = JSON.stringify(miNota); // Convertir datos a un string JSON.
    localStorage.setItem('miNota', json); // Guardar en localStorage un dato asociado a la key "usuarios".
    mostrarNotas();
    formularioNota.reset(); // reset limpia los campos del formulario.
};
console.log(miNota);

function mostrarNotas() {
    const fila = [];
    for (var i = 0; i < miNota.length; i++) {
        const nota1 = miNota[i];
        const tr = `
    <tr>
    <th scope="row">1</th>
    <td>${nota1.titulo}</</td>
    <td>${nota1.nota}</</td>
    <td>${nota1.tnota}</</td>
  </tr> `;
        fila.push(tr);
    }
    tablaNota.innerHTML = fila.join('');

}