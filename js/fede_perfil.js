// Interacciones del perfil de Fede
// 1. Películas y discos: en pantallas táctiles el efecto se activa con un toque
// 2. Mini terminal (gadget del TP1)

const punteroTactil = window.matchMedia("(pointer: coarse)");
const movimientoReducido = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);

// ---------------------------------------------------------
// Películas y discos en dispositivos táctiles
// ---------------------------------------------------------

const elementosTactiles = document.querySelectorAll(".fede-peli, .fede-disco");

elementosTactiles.forEach((elemento) => {
  elemento.addEventListener("click", () => {
    // Con mouse, el efecto se controla con :hover y :focus-visible.
    if (!punteroTactil.matches) return;

    // Solo un elemento del mismo tipo puede quedar activo a la vez.
    const grupo = elemento.classList.contains("fede-peli")
      ? ".fede-peli"
      : ".fede-disco";

    document.querySelectorAll(`${grupo}.activo`).forEach((otro) => {
      if (otro !== elemento) otro.classList.remove("activo");
    });

    elemento.classList.toggle("activo");
  });
});

// Si el dispositivo deja de ser táctil, limpiamos los estados sobrantes.
punteroTactil.addEventListener("change", () => {
  if (!punteroTactil.matches) {
    document.querySelectorAll(".activo").forEach((elemento) => {
      elemento.classList.remove("activo");
    });
  }
});

// ---------------------------------------------------------
// Mini terminal
// ---------------------------------------------------------

const boton = document.getElementById("btn-mi-interaccion");
const salida = document.getElementById("resultado-interaccion");

const comandos = [
  {
    nombre: "whoami",
    texto:
      "federico acosta maneiro\n" +
      "líder de proyecto ~ estructuración y deploy\n" +
      "buenos aires, argentina",
  },
  {
    nombre: "stack --lista",
    texto:
      "frontend: HTML5, CSS3, JavaScript, React\n" +
      "backend: Node.js, Java, Spring Boot, C#, MySQL\n" +
      "herramientas: Figma, Git y GitHub",
  },
  {
    nombre: "ls discos/",
    texto: "Souvlaki\n" + "World is Yours\n" + "Dropdead-Totalitar-split",
  },
];

let indiceComando = 0;

// Escribe el texto letra por letra. Con movimiento reducido, lo muestra completo.
function escribir(texto) {
  return new Promise((resolver) => {
    if (movimientoReducido.matches) {
      salida.textContent = texto;
      resolver();
      return;
    }

    let posicion = 0;

    function paso() {
      posicion += 1;
      salida.textContent = texto.slice(0, posicion);

      if (posicion < texto.length) {
        setTimeout(paso, 18);
      } else {
        resolver();
      }
    }

    paso();
  });
}

if (boton && salida) {
  boton.addEventListener("click", async () => {
    const comando = comandos[indiceComando];

    boton.disabled = true;
    salida.setAttribute("aria-busy", "true");
    salida.classList.add("escribiendo");

    await escribir(`$ ${comando.nombre}\n${comando.texto}`);

    salida.classList.remove("escribiendo");
    salida.setAttribute("aria-busy", "false");

    // Preparamos el siguiente comando del ciclo.
    indiceComando = (indiceComando + 1) % comandos.length;
    boton.textContent = `Ejecutar ${comandos[indiceComando].nombre}`;
    boton.disabled = false;
  });
}

// ---------------------------------------------------------
// Imágenes de películas y discos
// Si una imagen no existe o no carga, la quitamos para que se vea
// el degradé de respaldo en lugar del ícono de imagen rota.
// ---------------------------------------------------------

document
  .querySelectorAll(".fede-peli-img, .fede-funda-img")
  .forEach((imagen) => {
    const quitar = () => imagen.remove();

    imagen.addEventListener("error", quitar);

    // La imagen pudo fallar antes de que este script se ejecutara.
    if (imagen.complete && imagen.naturalWidth === 0) quitar();
  });
