let visibleContra = document.getElementById('visibleContra');

let contraseña = document.getElementById('contraseña');

visibleContra.addEventListener('click',function(){
    if(contraseña.type == 'password'){
        contraseña.type = 'text';
        imagen.src= "../img/ojoAbierto.png";
    }else{
        contraseña.type = 'password';
        imagen.src= "../img/ojoCerrado.png";
    }
});

let nombre = document.getElementById('nombre');

nombre.addEventListener('keyup',function(){

        validarBoton();

});

contraseña.addEventListener('keyup',function(){

        validarBoton();

});

let iniciar = document.getElementById('iniciar');

let imagen = document.getElementById('ojoVisible');
function validarBoton(){
    if(contraseña.value.length > 0 && nombre.value.length > 0){
        iniciar.disabled = false;
    }else{
        iniciar.disabled = true;
    }
}

const mensajeError = document.getElementById('mensajeError');

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
        console.log(usuarioEncontrado);

        if(usuarioEncontrado.id==0){
            mensajeError.classList.remove('encontrado');
            mensajeError.classList.add('noEncontrado');
            mensajeError.innerText = 'Usuario no encontrado'

        //Existe el usuario
        }else{
            mensajeError.classList.remove('noEncontrado');
            mensajeError.classList.add('encontrado');

            if(usuarioEncontrado.contraseña == contraseñaUsuario){
                if(usuarioEncontrado.permisos == 1){
                    mostrarMensajeBienvenida('admin/admin.html');
                }else{
                    mostrarMensajeBienvenida('usuario/index.html')
                }
            }else{
                mensajeError.classList.remove('encontrado');
                mensajeError.classList.add('noEncontrado');
                mensajeError.innerText = 'Contraseña incorrecta';

                document.getElementById('contraseña').value = '';

                validarBoton()
            }



        }


}


function mostrarMensajeBienvenida(ruta){

    let login = document.getElementById('login');

    let mensajeBienvenida = document.getElementById('mensajeBienvenida');

    let nombreUsuario = document.getElementById('nombre').value;
    mensajeBienvenida.innerText = "Bienvenido " + nombreUsuario;

    mensajeBienvenida.style.display = 'flex';

    login.replaceChildren();

    setTimeout(function() {
        window.location.href= ruta;
    }, 3000);
}