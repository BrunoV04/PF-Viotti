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



//LocalStorage-----------------------------------------------------------------------------------------------------------------------------


let recuperarDatosSiniestros = JSON.parse(localStorage.getItem("baseSiniestros"))
let recuperarDatosGestor = JSON.parse(localStorage.getItem("baseGestor"))
if(recuperarDatosSiniestros === null){
localStorage.setItem("baseSiniestros", JSON.stringify(baseSiniestrados))
}
if(recuperarDatosGestor === null){
localStorage.setItem("baseGestor", JSON.stringify(gestor))
}  












//LocalStorage-----------------------------------------------------------------------------------------------------------------------------

//Generar N° de Siniestro-----------------------------------------------------------------------------------------------------------------
const nuevoN = recuperarDatosSiniestros.reduce((acc, numero)=> {numero.nSiniestro
    if (numero.nSiniestro > acc) {
        return numero.nSiniestro;
      } else {
        return acc
      }
},0)


//Agregar Siniestro nuevo------------------------------------------------------------------------------------------------------------------
let dni = document.querySelector("#dniS")
let nombre = document.querySelector("#nombreap")
let empleador = document.querySelector("#empleador")
let tasa = document.querySelector("#tasa")
let btnGuardar = document.querySelector("#btnGuardar")

btnGuardar.addEventListener("click",()=>{
    agregarSiniestro()
})

function agregarSiniestro() {

    let dniValor = parseInt(dni.value)
    if (!isNaN(dniValor) && dniValor !== null) {
        let nombreValor = nombre.value
        if (nombreValor !== null && nombreValor !== "") {
            let empleadorValor = empleador.value
            if (empleadorValor !== null && empleadorValor !== "") {
                let tasaCobertura = parseInt(tasa.value)
                if (!isNaN(tasaCobertura) && tasaCobertura !== null) {
                    //por clase constructora armamos el nuevo siniestro y lo pusheamos al objeto
                    let agregar = new Siniestrado(dniValor, nombreValor, empleadorValor, tasaCobertura)
                    recuperarDatosSiniestros.push(agregar)
                    localStorage.setItem("baseSiniestros", JSON.stringify(recuperarDatosSiniestros))
                    cargarSiniestro()
                    calculoLimite()
                } else {
                    let modal = new bootstrap.Modal(document.getElementById('formularioError'));
                modal.show()
                let resError = document.querySelector("#cargaError")
                resError.textContent=`Ingrese un monto de Tasa de Cobertura de siniestro válido. Debe ser un valor numérico`
                }
            } else {
                let modal = new bootstrap.Modal(document.getElementById('formularioError'));
                modal.show()
                let resError = document.querySelector("#cargaError")
                resError.textContent=`Ingresar nombre del empleador que contrató la póliza.`
            }
        } else {
            let modal = new bootstrap.Modal(document.getElementById('formularioError'));
            modal.show()
            let resError = document.querySelector("#cargaError")
            resError.textContent=`Ingresar Nombre y Apellido del siniestrado.`
        }
    } else {
        let modal = new bootstrap.Modal(document.getElementById('formularioError'));
        modal.show()
        let resError = document.querySelector("#cargaError")
        resError.textContent=`Por favor ingresar un número de DNI válido.`
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
    } else {
        let modal = new bootstrap.Modal(document.getElementById('modalErrorBusqueda'));
        modal.show()
        resultadoError()
    }

    function resultadoError(){
        let resError = document.querySelector("#resultadoError")
        if(busqueda!==""){
        resError.textContent=`La búsqueda por  del N°${buscador} no coincide con ningún siniestro. Vuelva a intentarlo.`
    }else{
        resError.textContent=`Por favor ingresar un número de siniestro.` 
    }
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


let btnBuscar = document.querySelector("#buscador")
btnBuscar.addEventListener("click", buscarSiniestro)  

let btnActualizar = document.querySelector("#actualizarSiniestro")
btnActualizar.addEventListener("click", cargarSiniestro)  


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

function calculoLimite(){
let calculoLimite = recuperarDatosSiniestros.reduce((acc, sumaTC)=> acc + sumaTC.tasaCobertura,0)
let calculoFinal = parseInt(1525000-calculoLimite)
if(calculoFinal !== null && calculoFinal>=0){
    actualizarCalculo.innerHTML = `$ ${calculoFinal}`
}else{
    actualizarCalculo.innerHTML = `<style="color:red">$ ${calculoFinal}</style`
}
}



//Cargar gestor en el DOM--------------------------------------------------------------------------------------------------------------------------------------------------------------------








//Ver más datos--------------------------------------------------------------------------------------------------------------------------------------------------------------------
function verMas(){
    let verMas = document.querySelectorAll(".verSiniestro")
    verMas.forEach((boton)=>{
        boton.addEventListener("click", (e)=> {
        let id = parseInt(e.target.id)
        let verSiniestro = recuperarDatosSiniestros.find((ver)=> ver.nSiniestro === id)
        let modal = new bootstrap.Modal(document.getElementById('modalVerMas'));
        if(verSiniestro!==undefined){
            modal.show()
            modalVerMas()
        }
        function modalVerMas(){
            let tituloVerMas = document.querySelector("#tituloVerMas")
            let verMas = document.querySelector("#verMas")
            tituloVerMas.innerHTML=`Siniestro N°${verSiniestro.nSiniestro}`
            verMas.innerHTML=
           `DNI del Siniestrado: <strong>${verSiniestro.dni}</strong></br>
            Nombre y Apellido: <strong>${verSiniestro.nombre}</strong></br>
            Empleador a cargo de la póliza: <strong>${verSiniestro.empleador}</strong></br>
            Tipo de enfermedad: <strong>${verSiniestro.tipo}</strong></br>
            Tasa de Cobertura: <strong>$${verSiniestro.tasaCobertura}</strong></br></br>
            <button type="button" class="btn actualizarSiniestro" id="actualizarSiniestro">Borrar Siniestro</button>
            `
            
        }
    
    })})}



//ChatBot--------------------------------------------------------------------------------------------------------------------------------------------------------------------
let chatbot = document.querySelector("#chatbot")
chatbot.addEventListener("mouseenter", ()=>{
    Toastify({

        text: "Hola, soy ProtecBot, ¿en qué puedo ayudarte?",
        duration: 3000,
        position: "right",
        gravity:"bottom",
        style: {
            background: "linear-gradient(to right, #be0464, #a10062)",
            color:"#fff",
          },
        className: "mensajePersonalizado"
        }).showToast();
})