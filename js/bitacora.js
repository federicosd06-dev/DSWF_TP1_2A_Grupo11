import { bitacoraData } from "./bitacoraData.js";

function renderLog() {
  const contenedor = document.getElementById("contenedor-bitacora");

  const plantillaHTML = bitacoraData.map((entrada, indice) => {
    // Lógica opcional para pintar de rojo los bugs y verde las resoluciones
    let claseTag = "timeline-tag";
    if (entrada.categoria === "Bug detectado") claseTag += " tag-alerta";
    if (entrada.categoria === "Bug resuelto") claseTag += " tag-exito";

    // IDs únicos por entrada: conectan el botón con su panel (aria-controls)
    // y el panel con su encabezado (aria-labelledby).
    const idHeader = `header-bitacora-${indice}`;
    const idPanel = `panel-bitacora-${indice}`;

    return `
      <article class="timeline-item">
        <h2 class="timeline-titulo-wrapper">
          <button class="timeline-header"
                  id="${idHeader}"
                  aria-expanded="false"
                  aria-controls="${idPanel}">
            <span class="timeline-meta">
              <span class="timeline-fecha">${entrada.fecha}</span>
              <span class="${claseTag}">${entrada.categoria}</span>
            </span>
            <span class="timeline-titulo">${entrada.titulo}</span>
            <span class="timeline-icono" aria-hidden="true">+</span>
          </button>
        </h2>
        <div class="timeline-content"
             id="${idPanel}"
             role="region"
             aria-labelledby="${idHeader}"
             aria-hidden="true">
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
      // Ojo: antes era header.parentElement, pero ahora el padre directo
      // del botón es el <h2>, no el <article>. Con closest() buscamos
      // el <article> más cercano sin importar cuántos niveles haya.
      const item = header.closest(".timeline-item");
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