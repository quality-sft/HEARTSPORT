//EMPRESA: SYSTEM BOSS
//APLICACIÓN: HEART SPORT
//VISUAL2: ESPERA DE LOS 3 SEGUNDOS PARA PASAR A LA OTRA PÁGINA
function Ver() {
    const passwordInput = document.getElementById('password');
    const toggleButton = document.getElementById('togglePassword');
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;

    // Cambia la imagen del ojito
    const src = ojito.src.includes('IMAGENES/visual3/ojo.png') ? 'IMAGENES/visual3/ver.png' : 'IMAGENES/visual3/ojo.png';
    ojito.src = src;
}

function Ver2() {
    const passwordInput2 = document.getElementById('password2');
    const toggleButton2 = document.getElementById('togglePassword2');
    const type = passwordInput2.type === 'password' ? 'text' : 'password';
    passwordInput2.type = type;

    // Cambia la imagen del ojito
    const src = ojito2.src.includes('IMAGENES/visual3/ojo.png') ? 'IMAGENES/visual3/ver.png' : 'IMAGENES/visual3/ojo.png';
    ojito2.src = src;
}






document.getElementById("boton").onclick = function () {

    window.location.href = "pagovirtual.html";

}