const siniestrosSeleccionados = []


const baseSiniestrados = [
    { nSiniestro: 1234, dni: 37489586, nombre: "Alfredo Perez", empleador: "La Serenisima", tipo: "Accidente de Trabajo", tasaCobertura: 45000 },
    { nSiniestro: 1235, dni: 28587890, nombre: "Cristian Maidana", empleador: "YPF", tipo: "Accidente de Trabajo", tasaCobertura: 85000 },
    { nSiniestro: 1236, dni: 32004595, nombre: "Romina Meshler", empleador: "Correo Argentino", tipo: "Enfermedad Profesional", tasaCobertura: 42000 },
    { nSiniestro: 1237, dni: 16805900, nombre: "Conrrado Viotti", empleador: "La Serenisima", tipo: "Accidente de Trabajo", tasaCobertura: 75000 },
    { nSiniestro: 1238, dni: 22005808, nombre: "Martina Gutierrez", empleador: "YPF", tipo: "Enfermedad Profesional", tasaCobertura: 95000 },
    { nSiniestro: 1239, dni: 14005842, nombre: "Baltazar Benitez", empleador: "La Serenisima", tipo: "Enfermedad Profesional", tasaCobertura: 25000 },
    { nSiniestro: 1240, dni: 17897758, nombre: "Sandra Ribas", empleador: "YPF", tipo: "Enfermedad Profesional", tasaCobertura: 40000 }
]


const gestor = [
    { nGestor: 1, dni: 37471890, pass: "demo", nombre: "Pedro Ramos", zona: "Casa Central", limiteCobertura: 1525000 }
]











//Agregar Siniestro nuevo------------------------------------------------------------------------------------------------------------------
function agregarSiniestro() {
    let dni = parseInt(prompt("Ingresar DNI del nuevo siniestrado"))
    if (!isNaN(dni) && dni !== null) {
        let nombre = prompt("Ingresar Nombre y Apellido cómo figura en su DNI")
        if (nombre !== null && nombre !== "") {
            let empleador = prompt("Ingresar nombre del empleador")
            if (empleador !== null && empleador !== "") {
                let tasaCobertura = parseInt(prompt("Ingresar tasa de cobertura"))
                if (!isNaN(tasaCobertura) && tasaCobertura !== null) {
                    //por clase constructora armamos el nuevo siniestro y lo pusheamos al objeto
                    let agregar = new Siniestrado(dni, nombre, empleador, tasaCobertura)
                    baseSiniestrados.push(agregar)
                    cargarSiniestro()
                } else {
                    return alert("Ingrese un monto de Tasa de Cobertura de siniestro válido.\nDebe ser un valor numérico")
                }
            } else {
                return alert("Ingresar nombre del empleador que contrató la póliza")
            }
        } else {
            return alert("Ingresar Nombre y Apellido")
        }
    } else {
        return alert("Ingresar un DNI válido")
    }
}


//Agregar Siniestro nuevo------------------------------------------------------------------------------------------------------------------








//buscar siniestro-----------------------------------------------------------------------------------------------------------------------------
function buscarSiniestro() {
    let buscador = parseInt(prompt("Ingresar número de siniestro para efectuar la busqueda"))
    let busqueda = baseSiniestrados.find((buscar) => buscar.nSiniestro === buscador)
    if (busqueda !== undefined) {
        cargarBusqueda(busqueda)
    } else {
        return alert("No coincide con ningun número de siniestro")
    }
   
}

const contenedor3 = document.querySelector("div.visualSiniestros")
const titBusqueda = document.querySelector("h2.cambiarTit")
function mostrarBusqueda(siniestro) {
    return `
<div class="container visual">
<input class="form-check-input" type="checkbox" value="" id="${siniestro.nSiniestro}"><p class="color">N° de Siniestro:</p><p> ${siniestro.nSiniestro} </p><p class="color">Nombre: <p>${siniestro.nombre} </p><p class="color">Empleador: <p>${siniestro.empleador} </p><p class="color">TC: <p>$ ${siniestro.tasaCobertura}</p>
</div>
`

}


function cargarBusqueda(siniestro) {
    contenedor3.innerHTML = mostrarBusqueda(siniestro);
    titBusqueda.textContent = "Resultado de búsqueda:"
  }



//buscar siniestro-----------------------------------------------------------------------------------------------------------------------------


















//Cargar todos los siniestros actuales en el DOM---------------------------------------------------------------------------------------------------------------------------------------
const contenedor = document.querySelector("div.visualSiniestros")

function crearList(siniestro) {
    return `
    <div class="container visual">
    <input class="form-check-input" type="checkbox" value="" id="${siniestro.nSiniestro}"><p class="color">N° de Siniestro:</p><p> ${siniestro.nSiniestro} </p><p class="color">Nombre: <p>${siniestro.nombre} </p><p class="color">Empleador: <p>${siniestro.empleador} </p><p class="color">TC: <p>$ ${siniestro.tasaCobertura}</p>
    </div>
    `

}


function cargarSiniestro() {
    if (baseSiniestrados.length > 0) {
        contenedor.innerHTML = ""
        baseSiniestrados.forEach((siniestro) => contenedor.innerHTML += crearList(siniestro))
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
    if (gestor.length > 0) {
        contenedorGestor.innerHTML = ""
        gestor.forEach((gestorGuardado) => contenedorGestor.innerHTML += nuevoGestor(gestorGuardado))
    }
}




//Limite disponible TC--------------------------------------------------------------------------------------------------------------------------------------------------------------------
let limiteTC = document.querySelector("div.limiteTC")
function calculoLimite(){
let calculoLimite = baseSiniestrados.reduce((acc, sumaTC)=> acc + sumaTC.tasaCobertura,0)
let calculoFinal = parseInt(1525000-calculoLimite)
if(calculoFinal !== null && calculoFinal>=0){
    limiteTC.innerHTML += `<p class="color">LÍmite disponible TC: </p><p>$ ${calculoFinal}</p>`
}else{

}

}

//Cargar gestor en el DOM--------------------------------------------------------------------------------------------------------------------------------------------------------------------