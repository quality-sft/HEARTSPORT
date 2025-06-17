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






const SUPABASE_URL = "https://snytahpifahyqbuosbes.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNueXRhaHBpZmFoeXFidW9zYmVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0ODQ4ODcsImV4cCI6MjA1NzA2MDg4N30.Q1W3yhjqu-cRnnx9tRxA4Inxnlnz0AU78rfw6aDa4VY";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);



async function registerUser() {
    const nombre = document.getElementById('Nombre').value;
    const password = document.getElementById('password').value;
    const telefono = document.getElementById('tel').value;
    const correo = document.getElementById('Correo').value;
    const peso = document.getElementById('peso').value;
    const est = document.getElementById('estatura').value;
    const fechanacimiento = document.getElementById('fecha').value;
    const direccion = document.getElementById('dirección').value;

    let input = document.getElementById("Nombre").value.trim();
    let input2 = document.getElementById("Correo").value.trim();
    let input3 = document.getElementById("password").value.trim();
    let input4 = document.getElementById("password2").value.trim();
    let input5 = document.getElementById("tel").value.trim();
    let input6 = document.getElementById("fecha").value.trim();
    let input7 = document.getElementById("peso").value.trim();
    let input8 = document.getElementById("estatura").value.trim();
    let input9 = document.getElementById("dirección").value.trim();

    let fechaInput = new Date(document.getElementById("fecha").value);
    let fechaActual = new Date();

    fechaActual.setFullYear(fechaActual.getFullYear() - 18);

    if (fechaInput > fechaActual) {
        alert("Debes ser mayor de 18 años.");
        return true;
    }



    if (input === "") {
        alert("Por favor, rellene el campo del nombre antes de continuar.");
        return;
    } else {

        if (input2 === "") {
            alert("Por favor, rellene el campo del correo antes de continuar.");
            return;
        } else {
            if (input3 === "") {
                alert("Por favor, rellene el campo de la contraseña antes de continuar.");
                return;
            } else {
                if (input4 === "") {
                    alert("Por favor, confirme su contraseña antes de continuar.");
                    return;
                } else {
                    if (input5 === "") {
                        alert("Por favor, rellene el campo del telefono antes de continuar.");
                        return;
                    } else {
                        if (input6 === "") {
                            alert("Por favor, rellene el campo de su fecha antes de continuar.");
                            return;
                        } else {
                            if (input7 === "") {
                                alert("Por favor, rellene el campo de su peso antes de continuar.");
                                return;
                            } else {
                                if (input8 === "") {
                                    alert("Por favor, rellene el campo de su estatura antes de continuar.");
                                    return;
                                } else {
                                    if (input9 === ""){
                                        alert("Por favor, rellene el campo de su dirección antes de continuar.");
                                        return;
                                    } else {
                                    if (input3 != input4) {
                                        alert("Por favor, confirma bien tu contrasñea");
                                    } else {
                                        console.log("Intentando registrar usuario...");
                                        let { data, error } = await supabase.from('registro').insert([
                                            { nombre: nombre, correo: correo, contrasena: password, telefono: telefono, altura: est, peso: peso, fechanacimiento: fechanacimiento, direccion: direccion }
                                        ]).select();

                                        if (error) {
                                            alert('Error al registrar usuario: ' + error.message)
                                            console.error(error);
                                        } else {
                                            alert('Usuario registrado con éxito')
                                            console.log("Usuario registrado:", data);
                                        }
                                        localStorage.setItem('user_id', data[0].idusuario);
                                        localStorage.setItem('destino', "menu");

                                        console.log("Respuesta de Supabase:", data);
                                        await uploadImage();
                                        alert("¡Bienvenido a la familia Sport!");
                                        window.location.href = "cargando copy.html";
                                    }



                                }
                            }
                        }
                    }
                }
            }
        }


    }
    fetch


}}


const fotoInput = document.getElementById('foto')
const preview = document.getElementById('preview')
fotoInput.addEventListener('change', () => {
    const file = fotoInput.files[0]
    if (file) {
        preview.src = URL.createObjectURL(file)
    } else {
        preview.src = ''
    }
})



async function uploadImage() {
    const fileInput = document.getElementById('foto');
    const file = fileInput.files[0];
    const userId = localStorage.getItem("user_id");
    const fileName = `profile-${userId}.jpg`;

    let imageToUpload = file;

    if (!file) {
        // Si no se seleccionó imagen, cargar una imagen predeterminada
        const defaultImageUrl = '/IMAGENES/visual3/perfilfoto.png'; // o una URL pública válida
        const response = await fetch(defaultImageUrl);
        const blob = await response.blob();

        imageToUpload = new File([blob], fileName, { type: blob.type });
    }

    const { data, error } = await supabase.storage
        .from('imagenes')
        .upload(fileName, imageToUpload, {
            cacheControl: '3600',
            upsert: true,
        });

    if (error) {
        console.error('Error al subir la imagen:', error.message);
    } else {
        console.log('Imagen subida correctamente.');
    }
}


