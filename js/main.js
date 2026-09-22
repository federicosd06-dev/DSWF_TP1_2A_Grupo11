
// Removemos la clase "no-transiciones" del elemento raíz para permitir transiciones después de que el DOM esté completamente cargado
  document.documentElement.classList.remove("no-transiciones");

/* 0. MENÚ PARA MOBILE */
const menuToggle = document.getElementById("menu-toggle");
const navList = document.getElementById("nav-list");

// Guardamos la referencia al media query para verificar el tamaño de pantalla
const mediaQuery = window.matchMedia("(min-width: 769px)");

if (menuToggle && navList) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.classList.toggle("active");
    navList.classList.toggle("nav-open");
    menuToggle.setAttribute("aria-expanded", isOpen);
  });

  // Cerrar el menú automáticamente al hacer clic en cualquier enlace
  navList.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navList.classList.remove("nav-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

mediaQuery.addEventListener("change", (event) => {
  if (event.matches) {
    // Si la pantalla es más grande que 768px, aseguramos que el menú se cierre y se restablezcan los atributos
    menuToggle.classList.remove("active");
    navList.classList.remove("nav-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

/* 1. CAMBIAR THEME */
const htmlElement = document.documentElement;
const btnCambioTema = document.getElementById("theme-toggle");

if (btnCambioTema) {
  btnCambioTema.addEventListener("click", () => {

    // Obtenemos el tema actual y calculamos cuál será el siguiente.
    const temaActual = htmlElement.getAttribute("data-theme");
    const nuevoTema = temaActual === "oscuro" ? "claro" : "oscuro";
    
    // Guardamos la preferencia para conservarla al volver a cargar la página.
    localStorage.setItem("theme", nuevoTema);

    // Respetamos la configuración de accesibilidad del usuario.
    const prefiereMenosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Si el navegador no admite View Transitions o el usuario
    // prefiere menos movimiento, cambiamos el tema sin animación.
    if (!document.startViewTransition || prefiereMenosMovimiento) {
      htmlElement.setAttribute("data-theme", nuevoTema);
      return;
    }

    // Calculamos el centro del botón para usarlo como origen del efecto circular.
    const rect = btnCambioTema.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Calculamos el radio necesario para que el círculo cubra toda la pantalla.
    const radioFinal = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Pasamos las coordenadas calculadas a CSS mediante variables personalizadas.
    htmlElement.style.setProperty("--ripple-x", `${x}px`);
    htmlElement.style.setProperty("--ripple-y", `${y}px`);
    htmlElement.style.setProperty("--ripple-radius", `${radioFinal}px`);

    // Indicamos a CSS qué tipo de transición debe ejecutar.
    const tipoTransicion = nuevoTema === "claro" ? "a-claro" : "a-oscuro";
    htmlElement.setAttribute("data-theme-transicion", tipoTransicion);

    // Realizamos el cambio dentro de la transición para que el navegador
    // pueda capturar el estado anterior y el nuevo y animarlos.
    const transicion = document.startViewTransition(() => {
      htmlElement.setAttribute("data-theme", nuevoTema);
    });

    // Cuando termina la animación, eliminamos el atributo.
    transicion.finished.then(() => {
      htmlElement.removeAttribute("data-theme-transicion");
    });

  });
}

/* 3. TARJETAS */

// const contenedorTarjetas = document.querySelector(".contenedor-tarjetas");
const tarjetas = document.querySelectorAll(".tarjeta");

const mediaAnimacion = window.matchMedia(
  "(hover: hover) and (pointer: fine) and (min-width: 900px)"
);

const mediaMovimientoReducido = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

/* Comprueba si las condiciones permiten la animación 3D. */
function permiteAnimacion() {
  return mediaAnimacion.matches && !mediaMovimientoReducido.matches;
}

/* * Aplica el efecto 3D según la posición del puntero dentro de la tarjeta. */

function manejarMovimiento(evento){
  const tarjeta = evento.currentTarget;
  const contenido = tarjeta.querySelector(".tarjeta-izq");
  const avatar = tarjeta.querySelector(".avatar-desktop");

  const rect = tarjeta.getBoundingClientRect();

  const x = evento.clientX - rect.left - rect.width / 2;
  const y = evento.clientY - rect.top -rect.height / 2;

  /*
   * Convertimos la posición del puntero a un rango aproximado
   * de -1 a 1 tomando como referencia el centro de la tarjeta.
   */

  const posicionX = x / (rect.width / 2);
  const posicionY = y / (rect.height / 2);

  /*
   * Inclinamos la tarjeta según la posición del puntero.
   * El signo negativo invierte el eje vertical para que
   * el movimiento se perciba de forma natural.
   */

  const rotateX = -posicionY * 8;
  const rotateY = posicionX * 8;

  tarjeta.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  /* Movemos ligeramente el contenido para generar profundidad. */

  const contenidoX = posicionX * 10; 
  const contenidoY = posicionY * 10;

  if (contenido) { 
    contenido.style.transform = `translate3d(${contenidoX}px, ${contenidoY}px, 20px)`; 
  }

  /*
   * El avatar se desplaza más que el contenido para reforzar
   * la sensación de profundidad.
   */

  const avatarX = posicionX * 22.5;
  const avatarY = posicionY * 22.5;

  if (avatar) {
    avatar.style.transform =
      `translate3d(${avatarX}px, ${avatarY}px, 45px)`;
  }


}

/* * Devuelve la tarjeta y sus elementos internos a su estado original cuando el puntero abandona la tarjeta. */

function resetearAnimacion(evento) { 
  const tarjeta = evento.currentTarget; 
  const contenido = tarjeta.querySelector(".tarjeta-izq"); 
  const avatar = tarjeta.querySelector(".avatar-desktop"); 
  
  tarjeta.style.transform = ""; 
  
  if (contenido) { 
    contenido.style.transform = ""; 
  } 
  
  if (avatar) { 
    avatar.style.transform = ""; 
  } 
}

/* Los listeners de mouse solo se agregan cuando la animación está realmente habilitada. */ 
function activarAnimacion() { 
  tarjetas.forEach(
    (tarjeta) => { 
      tarjeta.addEventListener("mousemove", manejarMovimiento); 
      tarjeta.addEventListener("mouseleave", resetearAnimacion); 
    }
  ); 
}

/* Cuando la animación deja de estar disponible, eliminamos los listeners 
  y limpiamos cualquier transformación que haya quedado. */ 

function desactivarAnimacion() { 
  tarjetas.forEach(
    (tarjeta) => { 
      tarjeta.removeEventListener("mousemove", manejarMovimiento); 
      tarjeta.removeEventListener("mouseleave", resetearAnimacion); 
      
      tarjeta.style.transform = ""; 
      
      const contenido = tarjeta.querySelector(".tarjeta-izq"); 
      
      const avatar = tarjeta.querySelector(".avatar-desktop"); 
      
      if (contenido) { contenido.style.transform = ""; } 
      if (avatar) { avatar.style.transform = ""; } 
    }
  ); 
}

/*
 * Guarda el estado actual de los listeners de la animación.
 * Comienza en false porque todavía no se registraron.
 */

let animacionActiva = false;

/*
 * Comprueba si cambió la disponibilidad de la animación.
 * Si el estado ya coincide, no hacemos nada.
 */

function actualizarAnimacion() { 
  const debeAnimar = permiteAnimacion(); 
  if (debeAnimar === animacionActiva) { 
    return; 
  } 
  
  animacionActiva = debeAnimar; 
  
  if (debeAnimar) { 
    activarAnimacion(); 
  } else { 
    desactivarAnimacion(); 
  } 
}

/* * Comprobamos las condiciones al cargar la página. */ 
actualizarAnimacion();

/* * MediaQueryList avisa cuando cambia el resultado de alguna de las condiciones, 
por ejemplo al cruzar los 900px o al cambiar la preferencia de movimiento reducido. */ 

mediaAnimacion.addEventListener("change", actualizarAnimacion); 
mediaMovimientoReducido.addEventListener("change", actualizarAnimacion);




