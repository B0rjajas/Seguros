//Variables

const formulario = document.getElementById('cotizar-seguro');




// CONTSRUCTOR

function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo

}


Seguro.prototype.cotizarSeguro = function(){
     /*
     1 = AMericano 1.15
     2 = Asiatiaco 1.05
     3 = Europe 1.35
     
     */

     let cantidad;
     const base = 2000;

     switch(this.marca){
        case '1':
            cantidad = base * 1.15;
            break;

        case '2':
            cantidad = base * 1.05;
            break;

        case'3':
            cantidad = base * 1.35;
            break;

        default:
            break;
     }

     // LEer el año
     const diferencia = new Date().getFullYear() - this.year;
     //cada año qu ela diferencia es mayor,
     cantidad -= ((diferencia * 3) * cantidad ) / 100;


     /*
        Si el seguro es básico se multiplica or un 30% mas
        Si el seguro es completo se multiplica por un 50% mas
     */

        if(this.tipo === 'basico') {
            cantidad *= 1.30;
        } else {
            cantidad *= 1.50; 
        }

        return cantidad;

     console.log(cantidad)
}

//Interface Usuari

function UI() {

};

//Llenar las opciones de los años

UI.prototype.llenarOption = () => {
    const max = new Date().getFullYear(); // Debes declarar max y min como constantes
    const min = max - 20;

    // Llenar el select
    const selectYear = document.querySelector('#year');

    for (let i = max; i > min; i--) {
        const option = document.createElement('option'); // Crear un nuevo elemento option
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}


//MUestra ALerta en Pantalla

UI.prototype.mostrarMensaje =  (mensaje, tipo) => {
    const div = document.createElement('div');
    if(tipo === 'error') {
        div.classList.add('mensaje', 'error');
    }else {
        div.classList.add('mensaje', 'error');

    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    //INsertar en HTML
    const formulario = document.getElementById('cotizar-seguro');
    formulario.insertBefore(div,document.querySelector('#resultado'));

    //ELIMINAR MENSAJE ERROR;

    setTimeout(() =>{
        div.remove();

    },3000)
    }

    UI.prototype.mostrarResultado = (total, seguro) => {
        const { marca, year, tipo } = seguro;
        let textoMarca;
        switch(marca) {
            case'1':
            textoMarca = 'Americano';
                break;

            case '2':
                textoMarca = 'Asiatico'
                break;

            case'3':
                textoMarca = 'Europeo'
                break;

            default:
                break;
        }
        //Crear el Resultado
        const div = document.createElement('div');
        div.classList.add('mt-10');
        div.innerHTML = `
            <p class="header">Tu Resumen </p>
            <p class="font-bold"> Marca: <span class="font-normal">  ${textoMarca} </span> </p>
            <p class="font-bold"> Año: <span class="font-normal">  ${year} </span> </p>
            <p class="font-bold"> Tipo: <span class="font-normal">  ${tipo} </span> </p>

            <p class="font-bold"> Total: <span class="font-normal"> $ ${total} </span> </p>
        `;
    
        const resultadoDiv = document.querySelector('#resultado');
        resultadoDiv.appendChild(div);

        // Mostrar el spinner
        const spinner = document.querySelector('#cargando');
        spinner.style.display = 'block';

        // Después de un cierto tiempo, ocultar el spinner y mostrar el resultado
        setTimeout(() => {
        spinner.style.display = 'none'; // Oculta el spinner
        resultadoDiv.appendChild(div); // Muestra el resultado
        }, 3000);
    }
    

//INTANCIAR UI

const ui = new UI();

//EventListenr
document.addEventListener('DOMContentLoaded', () =>{

    ui.llenarOption(); //Llena el select con años
    formulario.addEventListener('submit', cotizarSeguro)

})


//Funciones Selectores

function cotizarSeguro(e){
    e.preventDefault();

    // Leer marca, año y tipo seleccionados
    const marca = document.getElementById('marca').value;
    const year = document.getElementById('year').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    // Validar que se hayan seleccionado todos los campos
    if (marca === '' || year === '' || tipo === ''){
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }

    // Mostrar mensaje de cotización en proceso
    ui.mostrarMensaje('Cotizando...', 'exito');

    // Instanciar el seguro
    const seguro = new Seguro(marca, year, tipo);

    // Calcular el total
    const total = seguro.cotizarSeguro();

    // Mostrar el resultado
    ui.mostrarResultado(total, seguro);

    //OCULTAR LAS COTIZACIONES PREVIA
    const resultados = document.querySelector('#resultado div')
    if(resultados != null){
        resultados.remove();
    }
}



