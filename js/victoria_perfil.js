
// ---------------------------------------------------------
// Detección del tipo de puntero
// ---------------------------------------------------------

// Se reutiliza para evitar consultar matchMedia() en cada click.
const pointerQuery = window.matchMedia("(pointer: coarse)");


// ---------------------------------------------------------
// Pestañas para móvil
// ---------------------------------------------------------

const tabButtons = document.querySelectorAll(".btn-tab");
const tabContents = document.querySelectorAll(".contenido-tab");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {

    // Las pestañas solo funcionan como tabs en móvil.
    if (window.innerWidth >= 801) return;

    const targetId = button.dataset.target;

    // Actualizamos el estado visual de la pestaña seleccionada.
    tabButtons.forEach((btn) => {
      const isSelected = btn === button;

      btn.classList.toggle("activo", isSelected);
      btn.setAttribute("aria-selected", isSelected);
    });

    // Mostramos únicamente el contenido correspondiente
    // a la pestaña seleccionada.
    tabContents.forEach((content) => {
      content.classList.toggle(
        "activo",
        content.id === targetId
      );
    });
  });
});


// ---------------------------------------------------------
// Interacción táctil para películas y música
// ---------------------------------------------------------

const mediaItems = document.querySelectorAll(".item");

document
  .querySelectorAll(".contenedor-poster")
  .forEach((container) => {

    container.addEventListener("click", (evento) => {

      // Esta interacción solo se activa en dispositivos
      // con puntero táctil.
      if (!pointerQuery.matches) return;

      const mediaItem = container.closest(".item");

      // Solo un elemento puede mostrar su información
      // alternativa a la vez.
      mediaItems.forEach((item) => {
        if (item !== mediaItem) {
          item.classList.remove("touch-active");
        }
      });

      mediaItem.classList.toggle("touch-active");
    });

  });


// ---------------------------------------------------------
// Interacción táctil para los Skill Chips
// ---------------------------------------------------------

const skillChips = document.querySelectorAll(".habilidades li");

skillChips.forEach((chip) => {

  chip.addEventListener("click", () => {

    // Los chips solo tienen este comportamiento en táctil.
    if (!pointerQuery.matches) return;

    // Solo un skill puede quedar activo a la vez.
    skillChips.forEach((otherChip) => {
      if (otherChip !== chip) {
        otherChip.classList.remove("touch-active");
      }
    });

    chip.classList.toggle("touch-active");
  });

});


// ---------------------------------------------------------
// Limpieza al cambiar de tipo de puntero
// ---------------------------------------------------------

pointerQuery.addEventListener("change", () => {

  // Si dejamos de usar un puntero táctil, eliminamos
  // los estados que solo tienen sentido en ese contexto.
  if (!pointerQuery.matches) {
    document
      .querySelectorAll(".touch-active")
      .forEach((element) => {
        element.classList.remove("touch-active");
      });
  }

});


// ---------------------------------------------------------
// Animación de puntos decorativos
// ---------------------------------------------------------

const decorativePoints = document.querySelectorAll(
  ".tarjeta-unificada-ria .puntos-decorativos span"
);

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

if (reduceMotion.matches) {
  // Con movimiento reducido, los puntos permanecen estáticos.
  decorativePoints.forEach((point) => {
    point.style.opacity = "0.35";
  });
} else {
  // Cada punto recibe una fase y velocidad diferentes
  // para evitar que todos aparezcan y desaparezcan al mismo tiempo.
  const points = [...decorativePoints].map((element) => ({
    element,
    phase: Math.random() * Math.PI * 2,
    speed: 0.0003 + Math.random() * 0.0005,
    intensity: 0.35 + Math.random() * 0.35,
  }));

  function animatePoints(timestamp) {
    points.forEach((point) => {
      const wave = Math.sin(
        timestamp * point.speed + point.phase
      );

      const opacity =
        Math.max(0, wave) * point.intensity;

      point.element.style.opacity = opacity;
    });

    requestAnimationFrame(animatePoints);
  }

  requestAnimationFrame(animatePoints);
}