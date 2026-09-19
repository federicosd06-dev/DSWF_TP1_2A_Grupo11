// js/main.js - Rotación Dinámica de Estados en la Portada

document.addEventListener("DOMContentLoaded", () => {
  const mensajeOutput = document.getElementById("mensaje-dinamico");

  const estadosEquipo = [
    "🚀 ¡Estamos listos para desplegar nuestro proyecto en Vercel!",
    "💻 Desarrollando con código limpio, semántico y organizado.",
    "⚙️ Aprendiendo y colaborando en equipo mediante Git y GitHub.",
    "👻 9/12/2018",
    "🎨 Aplicando responsive design para pantallas de 400px, 900px y 1200px.",
    "📚 Documentando nuestros progresos y decisiones en la bitácora.",
  ];

  let indiceActual = 0;

  // Función que cambia el mensaje de estado
  function cambiarMensaje() {
    if (!mensajeOutput) return;

    // Asignar el mensaje actual
    mensajeOutput.textContent = estadosEquipo[indiceActual];

    // Avanzar al siguiente índice (al llegar al final vuelve a 0)
    indiceActual = (indiceActual + 1) % estadosEquipo.length;
  }

  // Muestra el primer mensaje inmediatamente al cargar la página
  cambiarMensaje();

  // Rotación automática cada 6 segundos (6000 milisegundos)
  setInterval(cambiarMensaje, 6000);
});
