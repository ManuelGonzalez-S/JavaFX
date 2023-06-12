$(document).ready(function () {
    cargarAlumnos();
    cargarUsuarios();
});

async function cargarAlumnos() {
    const request = await fetch('/listarAlumnos', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const alumnos = await request.json();

    let alumnosArray = '';
    for (let alumno of alumnos) {
        let HTML = '<tr><td>' + alumno.id + '</td>' + '<td>' + alumno.nombre + '</td>' + '<td>' + alumno.nota + '</td>' + '<td>' + alumno.periodo + '</td>' +
            '</tr>';
        alumnosArray = alumnosArray + HTML;
    }
    document.querySelector('#alumnos tbody').outerHTML = alumnosArray;
}