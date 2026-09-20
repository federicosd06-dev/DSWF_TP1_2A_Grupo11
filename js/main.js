// js/main.js - Rotación Dinámica de Estados en la Portada

document.addEventListener("DOMContentLoaded", () => {

  /* 0. MENÚ HAMBURGUESA PARA MOBILE */
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

});
