// js/render.js
function renderLog() {
  const contenedor = document.getElementById("contenedor-bitacora");

  // 1. Renderizado dinámico usando .map()
  const plantillaHTML = bitacoraData.map(entrada => {
    // Lógica opcional para pintar de rojo los bugs y verde las resoluciones
    let claseTag = "timeline-tag";
    if (entrada.categoria === "Bug detectado") claseTag += " tag-alerta";
    if (entrada.categoria === "Bug resuelto") claseTag += " tag-exito";

    return `
      <article class="timeline-item">
        <button class="timeline-header" aria-expanded="false">
          <div class="timeline-meta">
            <span class="timeline-fecha">${entrada.fecha}</span>
            <span class="${claseTag}">${entrada.categoria}</span>
          </div>
          <h3 class="timeline-titulo">${entrada.titulo}</h3>
          <span class="timeline-icono" aria-hidden="true">+</span>
        </button>
        <div class="timeline-content" aria-hidden="true">
          <div class="timeline-inner">
            <p>${entrada.texto}</p>
          </div>
        </div>
      </article>
    `;
  }).join('');

  contenedor.innerHTML = plantillaHTML;

  // 2. Activación de la interactividad del Acordeón una vez inyectado el HTML
  const acordeonHeaders = document.querySelectorAll(".timeline-header");
  acordeonHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const content = item.querySelector(".timeline-content");
      const isOpen = item.classList.contains("activo");

      if (isOpen) {
        item.classList.remove("activo");
        header.setAttribute("aria-expanded", "false");
        content.setAttribute("aria-hidden", "true");
      } else {
        item.classList.add("activo");
        header.setAttribute("aria-expanded", "true");
        content.setAttribute("aria-hidden", "false");
      }
    });
  });
}

// Ejecutar la función cuando cargue el documento
document.addEventListener("DOMContentLoaded", renderLog);