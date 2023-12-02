const URL = "./js/siniestros.json"
const URL2 = "./js/gestores.json"


const baseSiniestrados = []


const gestor = []


function cargarDatos() {
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            baseSiniestrados.push(...data)
            guardarDatosEnLocalStorage()
        })
    fetch(URL2)
        .then(res => res.json())
        .then(data => {
            gestor.push(...data)
            //activo la funcion dentro del then para que sea sincronica una vez que alla pusehado y recien allí guardo en localstorge
            guardarDatosEnLocalStorage()

        })
}


//LocalStorage-----------------------------------------------------------------------------------------------------------------------------
function guardarDatosEnLocalStorage() {
    localStorage.setItem("baseSiniestros", JSON.stringify(baseSiniestrados));
    localStorage.setItem("baseGestor", JSON.stringify(gestor))
}

let recuperarDatosSiniestros = JSON.parse(localStorage.getItem("baseSiniestros"))
let recuperarDatosGestor = JSON.parse(localStorage.getItem("baseGestor"))
//para no pisar los datos nuevos guardados en localstorage cada vez que recarga
if (recuperarDatosSiniestros === null || recuperarDatosSiniestros === "") {
    cargarDatos();
    setTimeout(function () {
        location.reload();
    }, 100);
}










//LocalStorage-----------------------------------------------------------------------------------------------------------------------------

//Generar N° de Siniestro------------------------------------------------------------------------------------------------------------------
const nuevoN = recuperarDatosSiniestros.reduce((acc, numero) => {
    numero.nSiniestro
    if (numero.nSiniestro > acc) {
        return numero.nSiniestro;
    } else {
        return acc
    }
}, 0)


//Agregar Siniestro nuevo------------------------------------------------------------------------------------------------------------------
let dni = document.querySelector("#dniS")
let nombre = document.querySelector("#nombreap")
let empleador = document.querySelector("#empleador")
let tEnfermedad = document.querySelector("#tEnfermedad")
let tasa = document.querySelector("#tasa")
let btnGuardar = document.querySelector("#btnGuardar")

btnGuardar.addEventListener("click", () => {
    agregarSiniestro()
})

function agregarSiniestro() {

    let dniValor = parseInt(dni.value)
    if (!isNaN(dniValor) && dniValor !== null) {
        let nombreValor = nombre.value
        if (nombreValor !== null && nombreValor !== "") {
            let empleadorValor = empleador.value
            if (empleadorValor !== null && empleadorValor !== "") {
                let enfermedadValor = tEnfermedad.value
                if (enfermedadValor !== null && enfermedadValor !== "Seleccioná el tipo de enfermedad") {
                    let tasaCobertura = parseInt(tasa.value)
                    if (!isNaN(tasaCobertura) && tasaCobertura !== null) {
                        //por clase constructora armamos el nuevo siniestro y lo pusheamos al objeto
                        let agregar = new Siniestrado(dniValor, nombreValor, empleadorValor, enfermedadValor, tasaCobertura)
                        recuperarDatosSiniestros.push(agregar)
                        localStorage.setItem("baseSiniestros", JSON.stringify(recuperarDatosSiniestros))
                        cargarSiniestro()
                        calculoLimite()
                    } else {
                        let modal = new bootstrap.Modal(document.getElementById('formularioError'));
                        modal.show()
                        let resError = document.querySelector("#cargaError")
                        resError.textContent = `Ingrese un monto de Tasa de Cobertura de siniestro válido. Debe ser un valor numérico`
                    }
                }
                else {
                    let modal = new bootstrap.Modal(document.getElementById('formularioError'));
                    modal.show()
                    let resError = document.querySelector("#cargaError")
                    resError.textContent = `Ingrese un valor para el campo Enfermedad.`
                }

            } else {
                let modal = new bootstrap.Modal(document.getElementById('formularioError'));
                modal.show()
                let resError = document.querySelector("#cargaError")
                resError.textContent = `Ingresar nombre del empleador que contrató la póliza.`
            }
        } else {
            let modal = new bootstrap.Modal(document.getElementById('formularioError'));
            modal.show()
            let resError = document.querySelector("#cargaError")
            resError.textContent = `Ingresar Nombre y Apellido del siniestrado.`
        }
    } else {
        let modal = new bootstrap.Modal(document.getElementById('formularioError'));
        modal.show()
        let resError = document.querySelector("#cargaError")
        resError.textContent = `Por favor ingresar un número de DNI válido.`
    }
}

//Agregar Siniestro nuevo------------------------------------------------------------------------------------------------------------------








//buscar siniestro-----------------------------------------------------------------------------------------------------------------------------
let barraBusqueda = document.querySelector("#numero")

function buscarSiniestro() {
    let buscador = parseInt(barraBusqueda.value)
    let busqueda = recuperarDatosSiniestros.find((buscar) => buscar.nSiniestro === buscador)
    if (busqueda !== undefined) {
        cargarBusqueda(busqueda)
        verMas()
    } else {
        let modal = new bootstrap.Modal(document.getElementById('modalErrorBusqueda'));
        modal.show()
        resultadoError()
    }

    function resultadoError() {
        let resError = document.querySelector("#resultadoError")
        if (!isNaN(buscador)) {
            resError.textContent = `La búsqueda por  del N°${buscador} no coincide con ningún siniestro. Vuelva a intentarlo.`
        } else {
            resError.textContent = `Por favor ingresar un número de siniestro.`
        }
    }

}



const contenedor3 = document.querySelector("div.visualSiniestros")
const titBusqueda = document.querySelector("h2.cambiarTit")
function mostrarBusqueda(siniestro) {
    return `
<div class="container visual">
🩸🩺<p class="color">N° de Siniestro:</p><p> ${siniestro.nSiniestro} </p><p class="color">Nombre: <p>${siniestro.nombre} </p><p class="color">TC: <p>$ ${siniestro.tasaCobertura}</p><button type="button" class="btn verSiniestro" id="${siniestro.nSiniestro}">Ver
    más</button>
</div>
`

}


function cargarBusqueda(siniestro) {
    contenedor3.innerHTML = mostrarBusqueda(siniestro);
    titBusqueda.textContent = "Resultado de búsqueda:"
}


let btnBuscar = document.querySelector("#buscador")
btnBuscar.addEventListener("click", buscarSiniestro)

let btnActualizar = document.querySelector("#actualizarSiniestro")
btnActualizar.addEventListener("click", () => {
    cargarSiniestro()
    titBusqueda.textContent = "Siniestros actuales:"
})


//buscar siniestro-----------------------------------------------------------------------------------------------------------------------------


















//Cargar todos los siniestros actuales en el DOM---------------------------------------------------------------------------------------------------------------------------------------
const contenedor = document.querySelector("div.visualSiniestros")

function crearList(siniestro) {
    return `
    <div class="container visual">
    🩸🩺<p class="color">N° de Siniestro:</p><p> ${siniestro.nSiniestro} </p><p class="color">Nombre: <p>${siniestro.nombre} </p><p class="color">TC: <p>$ ${siniestro.tasaCobertura}</p><button type="button" class="btn verSiniestro" id="${siniestro.nSiniestro}">Ver
    más</button>
    </div>
    `
}


function cargarSiniestro() {

    if (recuperarDatosSiniestros.length > 0) {
        contenedor.innerHTML = ""
        recuperarDatosSiniestros.forEach((siniestro) => contenedor.innerHTML += crearList(siniestro))
        verMas()

    }
}

//Cargar todos los siniestros actuales en el DOM---------------------------------------------------------------------------------------------------------------------------------------




//Cargar gestor en el DOM--------------------------------------------------------------------------------------------------------------------------------------------------------------------
const contenedorGestor = document.querySelector("div.datosGestor")

function nuevoGestor(gestorGuardado) {
    return `
    <div class="container visualGestor">
    <p class="color">Nombre del Gestor:</p><p> ${gestorGuardado.nombre} </p><p class="color">Zona a cargo: <p>${gestorGuardado.zona} </p><p class="color">Límite TC: <p>$ ${gestorGuardado.limiteCobertura}</p>
    </div>
    `

}


function crearGestor() {
    if (recuperarDatosGestor.length > 0) {
        contenedorGestor.innerHTML = ""
        recuperarDatosGestor.forEach((gestorGuardado) => contenedorGestor.innerHTML += nuevoGestor(gestorGuardado))
    }
}




//Limite disponible TC--------------------------------------------------------------------------------------------------------------------------------------------------------------------
let actualizarCalculo = document.querySelector("p.actualizarCalculo")

function calculoLimite() {
    let calculoLimite = recuperarDatosSiniestros.reduce((acc, sumaTC) => acc + sumaTC.tasaCobertura, 0)
    let calculoFinal = parseInt(1525000 - calculoLimite)
    if (calculoFinal !== null && calculoFinal >= 0) {
        actualizarCalculo.innerHTML = `$ ${calculoFinal}`
    } else {
        actualizarCalculo.innerHTML = `<style="color:red">$ ${calculoFinal}</style`
    }
}


//Cargar gestor en el DOM--------------------------------------------------------------------------------------------------------------------------------------------------------------------





//Ver más datos--------------------------------------------------------------------------------------------------------------------------------------------------------------------
function verMas() {
    let verMas = document.querySelectorAll(".verSiniestro")
    verMas.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            let id = parseInt(e.target.id)
            let verSiniestro = recuperarDatosSiniestros.find((ver) => ver.nSiniestro === id)
            let modal = new bootstrap.Modal(document.getElementById('modalVerMas'));
            if (verSiniestro !== undefined) {
                modal.show()
                modalVerMas()
            }
            function modalVerMas() {
                let tituloVerMas = document.querySelector("#tituloVerMas")
                let verMas = document.querySelector("#verMas")
                tituloVerMas.innerHTML = `Siniestro N°${verSiniestro.nSiniestro}`
                verMas.innerHTML =
                    `DNI del Siniestrado: <strong>${verSiniestro.dni}</strong></br>
            Nombre y Apellido: <strong>${verSiniestro.nombre}</strong></br>
            Empleador a cargo de la póliza: <strong>${verSiniestro.empleador}</strong></br>
            Tipo de enfermedad: <strong>${verSiniestro.tipo}</strong></br>
            Tasa de Cobertura: <strong>$${verSiniestro.tasaCobertura}</strong></br></br>
            <button type="submit" class="btn actualizarSiniestro borrarSiniestro" id="${verSiniestro.nSiniestro}">Borrar Siniestro</button>
            `
                borrar()
            }

        })
    })
}


//Borrar boton--------------------------------------------------------------------------------------------------------------------------------------------------------------
function borrar() {
    let borrar = document.querySelectorAll(".borrarSiniestro")
    borrar.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            let id = parseInt(e.target.id)
            let borrarDato = recuperarDatosSiniestros.findIndex((borrar) => borrar.nSiniestro === id);

            if (borrarDato !== -1) {
                recuperarDatosSiniestros.splice(borrarDato, 1);
                localStorage.setItem("baseSiniestros", JSON.stringify(recuperarDatosSiniestros));
                cargarSiniestro()
            }
        })
    })
}


//ChatBot--------------------------------------------------------------------------------------------------------------------------------------------------------------------
let chatbot = document.querySelector("#chatbot")
chatbot.addEventListener("mouseenter", () => {
    Toastify({

        text: "Hola, soy ProtecBot, ¿en qué puedo ayudarte?",
        duration: 3000,
        position: "right",
        gravity: "bottom",
        style: {
            background: "linear-gradient(to right, #be0464, #a10062)",
            color: "#fff",
        },
        className: "mensajePersonalizado"
    }).showToast();
})