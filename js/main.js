
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


