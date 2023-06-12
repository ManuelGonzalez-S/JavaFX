let visibleContra = document.getElementById('visibleContra');

let contraseña = document.getElementById('contraseña');

let imagen = document.getElementById('ojoVisible');

visibleContra.addEventListener('click', function () {
    if (contraseña.type == 'password') {
        contraseña.type = 'text';
        imagen.src = "../img/ojoAbierto.png";
    } else {
        contraseña.type = 'password';
        imagen.src = "../img/ojoCerrado.png";
    }
});

let visibleContraRepetir = document.getElementById('visibleContraRepetir');

let contraseñaRepetir = document.getElementById('contraseñaRepetir');

let imagenRepetir = document.getElementById('ojoVisibleRepetir');

visibleContraRepetir.addEventListener('click', function () {
    if (contraseñaRepetir.type == 'password') {
        contraseñaRepetir.type = 'text';
        imagenRepetir.src = "../img/ojoAbierto.png";
    } else {
        contraseñaRepetir.type = 'password';
        imagenRepetir.src = "../img/ojoCerrado.png";
    }
});

let nombre = document.getElementById('nombre');

nombre.addEventListener('keyup', function () {

    validarTodo();

});

contraseña.addEventListener('keyup', function () {

    validarTodo();


});

contraseñaRepetir.addEventListener('keyup', function () {
    validarTodo();
})

function validarTodo(){

    let nombreUsuario = document.getElementById('nombre').value;

    //Contraseñas
    contraseñas = validarContraseñas();

    //Boton
    if(contraseñas && nombreUsuario.length > 0){
        validarBoton(false);
    }else{
        validarBoton(true);
    }
}

function validarBoton(valor){
    iniciar.disabled = valor;
}

function validarContraseñas() {

    let mensajeContraseñas = document.getElementById('mensajeContrasenas')

    let iguales;

    if (contraseñaRepetir.value.length == 0) {
        mensajeContraseñas.innerHTML = ' ';
        iguales = false;

    } else {

        iguales = comprobarContraseñas();

        if (!iguales) {
            mensajeContraseñas.innerHTML = 'Las contraseñas no coinciden'
        }else{
            mensajeContraseñas.innerHTML = ''
        }
    }

    return iguales;
}

function comprobarContraseñas() {

    if (contraseñaRepetir.value.length == 0 || contraseña.value != contraseñaRepetir.value) {
        return false;
    } else {
        return true;
    }

}

const mensajeError = document.getElementById('mensajeError');

const mensajeNombre = document.getElementById('mensajeNombre')

async function validarUsuario() {
    let nombreUsuario = document.getElementById('nombre').value;
    let contraseñaUsuario = document.getElementById('contraseña').value;


    const existe = await fetch('/findUsuarios/' + nombreUsuario, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const usuarioEncontrado = await existe.json();

    //Existe el usuario
    if(usuarioEncontrado.id!=0){
        mensajeError.classList.add('noEncontrado');
        mensajeError.classList.remove('encontrado');
        mensajeError.innerText = 'El usuario ya se encuentra registrado'

        //No existe el usuario
    }else{

        mostrarMensajeBienvenida('../index.html')

        añadirUsuario();
    }


}


async function añadirUsuario() {
    let datos = {};

    datos.nombre = nombre.value;

    datos.contraseña = contraseña.value;

    console.log(datos)

    const request = await fetch('/añadirUsuarios', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });

}




function mostrarMensajeBienvenida(ruta){

    let register = document.getElementById('register');

    let mensajeBienvenida = document.getElementById('mensajeBienvenida');

    let nombreUsuario = document.getElementById('nombre').value;
    mensajeBienvenida.innerText = nombreUsuario + ' registrado correctamente';

    mensajeBienvenida.style.display = 'flex';

    register.replaceChildren();

    setTimeout(function() {
        window.location.href= ruta;
    }, 3000);
}