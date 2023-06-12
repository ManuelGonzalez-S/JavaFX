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
            '<td><button type="button" onclick="eliminarAlumno(' + alumno.id + ')">' + "Eliminar" + '</button>' +
            '<button type="button" onclick="editarAlumno(' + alumno.id + ')">' + "Editar" + '</button>' +
            '</td>' +
            '</tr>';
        alumnosArray = alumnosArray + HTML;
    }
    document.querySelector('#alumnos tbody').outerHTML = alumnosArray;
}

function editarAlumno(id){

}

async function cargarUsuarios() {
    const request = await fetch('/listarUsuarios', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const usuarios = await request.json();

    let usuariosArray = '';
    for (let usuario of usuarios) {
        let HTML = '<tr><td>' + usuario.id + '</td>' + '<td>' + usuario.nombre + '</td>' + '<td>' + usuario.contraseña + '</td>' + '<td>' + usuario.permisos + '</td>' +
            '<td><button type="button" onclick="eliminarUsuario(' + usuario.id + ')">' + "Eliminar" + '</button>' +
            '<button type="button" onclick="editarUsuario('+usuario.nombre + ')">' + "Editar" + '</button>' +
            '</tr>';
        usuariosArray = usuariosArray + HTML;
    }
    document.querySelector('#usuarios tbody').outerHTML = usuariosArray;
}

function editarUsuario(nombre){

    buscarUsuario(nombre)

}

async function buscarUsuario(nombre) {

    try{
        const existe = await fetch('/findUsuarios/' + nombre, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const usuarioEncontrado = await existe.json();

        console.log(usuarioEncontrado)

        return usuarioEncontrado;

    }catch (error){
        console.log(error)
    }
}

async function eliminarAlumno(id) {
    const request = await fetch('/eliminarAlumnos/' + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    location.reload();
}

async function eliminarUsuario(id) {
    const request = await fetch('/eliminarUsuarios/' + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    location.reload();
}

async function añadirAlumnos() {
    let datos = {};
    datos.nombre = document.getElementById("txtNombreAlumno").value;
    datos.periodo = document.getElementById("txtPeriodoAlumno").value;
    datos.nota = document.getElementById("txtNotaAlumno").value;

    const request = await fetch('/añadirAlumnos', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
    location.reload();

}


async function añadirUsuario() {
    let datos = {};
    datos.nombre = document.getElementById("txtNombreUsuario").value;
    datos.contraseña = document.getElementById("txtContraseñaUsuario").value;

    const request = await fetch('/añadirUsuarios', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
    location.reload();

}



function cerrarModalAlumnos(){
    window.modalAlumnos.close();

    let inputs = document.getElementsByClassName('inputAlumno');

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}

function cerrarModalUsuarios(){

    window.modalUsuarios.close();

    let inputs = document.getElementsByClassName('inputUsuario');

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }

}