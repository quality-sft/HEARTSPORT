//EMPRESA: SYSTEM BOSS
//APLICACIÓN: HEART SPORT
//VISUAL3: BOTON DE VER Y NO VER LA CONTRASEÑA





const SUPABASE_URL = "https://snytahpifahyqbuosbes.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNueXRhaHBpZmFoeXFidW9zYmVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0ODQ4ODcsImV4cCI6MjA1NzA2MDg4N30.Q1W3yhjqu-cRnnx9tRxA4Inxnlnz0AU78rfw6aDa4VY";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loginUser() {
    const correo = document.getElementById('correo').value;
    const password = document.getElementById('password').value;
    const telefono = document.getElementById('tel').value;

    let input = document.getElementById("correo").value.trim();
    let input2 = document.getElementById("password").value.trim();
    let input3 = document.getElementById("tel").value.trim();

    if (input === "") {
        alert("Por favor, rellene el campo del nombre antes de continuar.");
    } else {

        if (input2 === "") {
            alert("Por favor, rellene el campo de la contraseña antes de continuar.");
        } else {
            if (input3 === "") {
                alert("Por favor, rellene el campo del telefono antes de continuar.");
            } else {
                let { data, error } = await supabase
                    .from('registro')
                    .select('*')
                    .eq('correo', correo)
                    .eq('contrasena', password)
                    .eq('telefono', telefono)
                    .single();  // Para traer solo un usuario

                if (error || !data) {
                    alert("Correo o contraseña incorrectos");
                    console.error(error);

                } else {
                    alert("Inicio de sesión exitoso");
                    console.log("Usuario encontrado:", data);
                    localStorage.setItem('user_id', data.idusuario);
                    localStorage.setItem('destino', "menu");

                    window.location.href = "cargando copy.html"
                }
            }
        }


    }


}
