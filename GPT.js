//Variables
const formulario = document.getElementById('cotizar-seguro');

// CONSTRUCTOR
function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function() {
    const base = 2000;
    let cantidad = base;

    cantidad *= (this.marca === '1') ? 1.15 :
                (this.marca === '2') ? 1.05 :
                (this.marca === '3') ? 1.35 : 1;

    const diferencia = new Date().getFullYear() - this.year;
    cantidad -= ((diferencia * 3) * cantidad) / 100;

    cantidad *= (this.tipo === 'basico') ? 1.30 : 1.50;

    return cantidad;
};

// Interface Usuario
function UI() {}

// Llenar las opciones de los años
UI.prototype.llenarOption = () => {
    const max = new Date().getFullYear();
    const min = max - 20;
    const selectYear = document.querySelector('#year');

    for (let i = max; i > min; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
};

// Mostrar Alerta en Pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement('div');
    div.classList.add('mensaje', tipo);
    div.classList.add('mt-10');
    div.textContent = mensaje;

    const formulario = document.getElementById('cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);
};

// Mostrar Resultado
UI.prototype.mostrarResultado = (total, seguro) => {
    const { marca, year, tipo } = seguro;
    const textoMarca =
        (marca === '1') ? 'Americano' :
        (marca === '2') ? 'Asiático' :
        (marca === '3') ? 'Europeo' : '';

    const div = document.createElement('div');
    div.classList.add('mt-10');
    div.innerHTML = `
        <p class="header">Tu Resumen </p>
        <p class="font-bold"> Marca: <span class="font-normal">${textoMarca}</span> </p>
        <p class="font-bold"> Año: <span class="font-normal">${year}</span> </p>
        <p class="font-bold"> Tipo: <span class="font-normal">${tipo}</span> </p>
        <p class="font-bold"> Total: <span class="font-normal">$${total}</span> </p>
    `;

    const resultadoDiv = document.querySelector('#resultado');
    resultadoDiv.innerHTML = ''; // Limpiar resultados anteriores
    resultadoDiv.appendChild(div);
};

// Instanciar UI
const ui = new UI();

// Event Listener
document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOption();
    formulario.addEventListener('submit', cotizarSeguro);
});

// Funciones Selectores
function cotizarSeguro(e) {
    e.preventDefault();

    // Leer marca, año y tipo seleccionados
    const marca = document.getElementById('marca').value;
    const year = document.getElementById('year').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    // Validar que se hayan seleccionado todos los campos
    if (marca === '' || year === '' || tipo === '') {
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }

    // Mostrar mensaje de cotización en proceso
    ui.mostrarMensaje('Cotizando...', 'exito');

    // Instanciar el seguro y calcular el total
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();

    // Mostrar el resultado
    ui.mostrarResultado(total, seguro);
}
