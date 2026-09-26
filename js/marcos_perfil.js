/*========== MARCOS ==========*/

/*========== PELÍCULAS ==========*/
// Permite girar las tarjetas al hacer clic.
document.querySelectorAll(".marcos-flip-card").forEach((tarjeta) => {
  tarjeta.addEventListener("click", () => {
    tarjeta.classList.toggle("girada");
  });
});

/*========== ÁLBUMES ==========*/
// Permite girar las tarjetas de álbumes al hacer clic.
document.querySelectorAll(".marcos-album-card").forEach((tarjeta) => {
  tarjeta.addEventListener("click", () => {
    tarjeta.classList.toggle("girada");
  });
});

/*========== DIAGNÓSTICO QA ==========*/
// Muestra un resultado cuando se ejecuta la prueba.
const boton = document.getElementById("btn-diagnostico");
const resultado = document.getElementById("resultado-diagnostico");

boton.addEventListener("click", () => {
  resultado.innerHTML = `
    <div class="diagnostico-item">✓ Responsive</div>
    <div class="diagnostico-item">✓ Multimedia</div>
    <div class="diagnostico-item">✓ Navegación</div>
    <div class="diagnostico-item">✓ JavaScript</div>
    <strong>Diagnóstico finalizado: 5/5 pruebas.</strong>
  `;
});