//Variables
const marca = document.querySelector('#marca');
const Year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');


const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear();
const min = max - 10;

//Generar el OBJ con lo seleccionado
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

//Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); //Le pasamos como parametro el arreglo de objetos de auto
    llenarSelect();
})

//EventListeners para los selectores
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
})
year.addEventListener('change', e => {
    datosBusqueda.year = parseInt(e.target.value);
    filtrarAuto();
})
minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;
    filtrarAuto();
})
maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
})
puertas.addEventListener('change', e => {
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
})
transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
})
color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;
    filtrarAuto();
})




//Funciones
function mostrarAutos(autos) {
    
    limpiarHTML(); //Eliminar el HTML previo, borra y despues hace el primer foreach
    
    autos.forEach( auto => {
        const {marca, modelo, year, puertas, transmision, precio, color} = auto; //De cada auto del arreglo
        
        const autoHTML = document.createElement('p');
        autoHTML.classList.add('impresiones')
        autoHTML.textContent = `
        ${marca} ${modelo} - ${year} - ${puertas} 
        Puertas - Transmisión ${transmision} - Precio $${precio} - Color ${color}
        `
        // insertarlo en el HTML
        resultado.appendChild(autoHTML);
    });
}

function limpiarHTML() {
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function llenarSelect() {
    for( let i=max; i>=min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }
}

function filtrarAuto() {
    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear ).filter( filtrarMinimo ).filter( filtrarMaximo ).filter( 
        filtrarPuertas ).filter( filtrarTransmision ). filter( filtrarColor );
    //función de alto nivel: funcion que tiene como parametro otra función
    //console.log(resultado)
    //mostrarAutos(resultado); //aca no le pasamos el arreglo de objeto auto, sino el de resultado

    if(resultado.length) { //si el arreglo esta vacio, porque no hubo resultado, ira por el else
        mostrarAutos(resultado);
    }
    else{
        noResultado();
    }

}

function noResultado() {
    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'NO HAY RESULTADOS';
    resultado.appendChild(noResultado);
}

//Funciones de Alto Nivel dentro del Filter de FiltrarAutos

function filtrarMarca(auto) { 
    // console.log(auto) // esta variable de auto es la que sale del iterador de filter, cada iteración genera un auto nuevo de autos, el obj - retorna todos
    const {marca} = datosBusqueda;
    
    if(datosBusqueda.marca) {
        return auto.marca === datosBusqueda.marca;
    }
    return auto;   
}

function filtrarYear(auto) {
    const {year} = datosBusqueda;

    if(year) {
        return auto.year === year;
    }
    return auto;
}

function filtrarMinimo(auto) {
    const {minimo} = datosBusqueda;
    //pasa lo mismo minimo esta en string alla y aca en numero, pero con el comparador no estricto safa
    if(minimo) {
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto) {
    const {maximo} = datosBusqueda;
    //pasa lo mismo minimo esta en string alla y aca en numero, pero con el comparador no estricto safa
    if(maximo) {
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto) {
    const {puertas} = datosBusqueda;
    //pasa lo mismo minimo esta en string alla y aca en numero, pero con el comparador no estricto safa
    if(puertas) {
        return auto.precio === puertas;
    }
    return auto;
}

function filtrarTransmision(auto) {
    const {transmision} = datosBusqueda;
    //pasa lo mismo minimo esta en string alla y aca en numero, pero con el comparador no estricto safa
    if(transmision) {
        return auto.precio === transmision;
    }
    return auto;
}

function filtrarColor(auto) {
    const {color} = datosBusqueda;
    //pasa lo mismo minimo esta en string alla y aca en numero, pero con el comparador no estricto safa
    if(color) {
        return auto.precio === color;
    }
    return auto;
}