// ==========================================
// CONTROL DE PESTANAS
// ==========================================
function cambiarPestana(event, pestanaId) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    // 1. Ocultar todas las pestanas
    const pestanas = document.querySelectorAll('.pestana');
    pestanas.forEach(p => p.classList.remove('activa'));

    // 2. Quitar estado activo del menu
    const enlaces = document.querySelectorAll('.enlace-nav');
    enlaces.forEach(e => e.classList.remove('activa'));

    // 3. Mostrar la pestana seleccionada
    const pestanaSeleccionada = document.getElementById(pestanaId);
    if (pestanaSeleccionada) {
        pestanaSeleccionada.classList.add('activa');
    }

    // 4. Marcar boton del menu como activo si proviene de un clic
    if (event && event.target) {
        event.target.classList.add('activa');
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function irAPedidoDesdeGaleria(nombreObra) {
    // Regresa a la pestana de inicio
    cambiarPestana(null, 'pestana-inicio');
    
    // Activa visualmente el primer boton del menu (Inicio)
    const enlaces = document.querySelectorAll('.enlace-nav');
    if (enlaces.length > 0) {
        enlaces[0].classList.add('activa');
    }

    // Llena los datos correspondientes en el formulario
    const inputObra = document.getElementById('obra');
    const selectSolicitud = document.getElementById('tipo-solicitud');
    
    if (selectSolicitud) selectSolicitud.value = "Pedido de Obra";
    if (inputObra) inputObra.value = nombreObra;

    // Scroll suave al formulario tras el cambio de vista
    setTimeout(() => {
        const seccionContacto = document.getElementById('contacto');
        if (seccionContacto) seccionContacto.scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

// ==========================================
// CARRUSEL ROTATIVO AUTOMATICO
// ==========================================
const obrasDestacadas = [
    {
        titulo: "Esencia Escondida",
        url: "https://images.unsplash.com/photo-1547891654-e66ed7edd96c?w=1200"
    },
    {
        titulo: "Tormenta de Color",
        url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200"
    },
    {
        titulo: "Calma en el Caos",
        url: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=1200"
    }
];

let indiceActual = 0;
const imgElement = document.getElementById('imagen-carrusel');
const tituloElement = document.getElementById('titulo-carrusel');

function rotarCarrusel() {
    if (!imgElement || !tituloElement) return;
    indiceActual = (indiceActual + 1) % obrasDestacadas.length;
    imgElement.style.opacity = 0;
    
    setTimeout(() => {
        imgElement.src = obrasDestacadas[indiceActual].url;
        tituloElement.textContent = obrasDestacadas[indiceActual].titulo;
        imgElement.style.opacity = 0.85;
    }, 800);
}
setInterval(rotarCarrusel, 4000);

// ==========================================
// LOGICA AUXILIAR DEL FORMULARIO
// ==========================================
function actualizarCamposFormulario() {
    const select = document.getElementById('tipo-solicitud').value;
    const inputObra = document.getElementById('obra');
    if (!inputObra) return;
    
    if (select === "Informacion General") {
        inputObra.placeholder = "Ej. Dudas sobre envios, proximas exposiciones...";
        inputObra.value = "";
    } else if (select === "Pedido de Obra") {
        inputObra.placeholder = "Escribe el nombre de la obra que viste en la galeria";
    } else {
        inputObra.placeholder = "Ej. Cuadro de 1x1 metros, tonos pasteles...";
    }
}

const formPedido = document.getElementById('form-pedido');
if (formPedido) {
    formPedido.addEventListener('submit', function(event) {
        event.preventDefault();
        alert("¡Mensaje recibido con éxito (Simulacion Backend)!");
    });
}