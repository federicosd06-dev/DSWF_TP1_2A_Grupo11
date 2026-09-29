// Interacciones del perfil de Fede
// 1. Películas: en pantallas táctiles el efecto se activa con un toque
// 2. Discos: hover/foco en desktop, toque en táctil; ambos disparan un
//    fragmento aleatorio de audio
// 3. Mini terminal (gadget del TP1)

const punteroTactil = window.matchMedia("(pointer: coarse)");
const movimientoReducido = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);

// ---------------------------------------------------------
// Películas en dispositivos táctiles
// ---------------------------------------------------------

const peliculasTactiles = document.querySelectorAll(".fede-peli");

peliculasTactiles.forEach((elemento) => {
  elemento.addEventListener("click", () => {
    // Con mouse, el efecto se controla con :hover y :focus-visible.
    if (!punteroTactil.matches) return;

    // Solo una película puede quedar activa a la vez.
    document.querySelectorAll(".fede-peli.activo").forEach((otro) => {
      if (otro !== elemento) otro.classList.remove("activo");
    });

    elemento.classList.toggle("activo");
  });
});

// Si el dispositivo deja de ser táctil, limpiamos los estados sobrantes.
punteroTactil.addEventListener("change", () => {
  if (!punteroTactil.matches) {
    document.querySelectorAll(".fede-peli.activo").forEach((elemento) => {
      elemento.classList.remove("activo");
    });
  }
});

// ---------------------------------------------------------
// Discos: vinilo con la tapa impresa + fragmento aleatorio
// Desktop: hover / foco de teclado. Táctil: toque (toggle).
// Cada disco guarda su PROPIO audio y su PROPIO temporizador,
// para que pasar rápido entre discos no cruce el estado de uno con otro.
// ---------------------------------------------------------

const DURACION_FRAGMENTO = 15000; // ms que suena cada fragmento como máximo
const discos = document.querySelectorAll(".fede-disco");

const estadoDiscos = new Map();

discos.forEach((disco) => {
  const rutaAudio = disco.dataset.audio;
  estadoDiscos.set(disco, {
    audio: rutaAudio ? new Audio(rutaAudio) : null,
    expuesto: false,
    temporizador: null,
  });
});

function detenerDisco(disco) {
  const estado = estadoDiscos.get(disco);
  if (!estado) return;

  estado.expuesto = false;
  clearTimeout(estado.temporizador);
  estado.temporizador = null;

  if (estado.audio) estado.audio.pause();
  disco.classList.remove("sonando");
}

function reproducirFragmentoAleatorio(disco) {
  const estado = estadoDiscos.get(disco);
  if (!estado || !estado.audio) return; // este disco todavía no tiene audio asignado

  // Solo puede sonar un disco a la vez.
  discos.forEach((otro) => {
    if (otro !== disco) detenerDisco(otro);
  });

  estado.expuesto = true;
  const audio = estado.audio;

  const empezarFragmento = () => {
    // Si mientras cargaba el audio el usuario ya se fue de este disco,
    // no lo arrancamos igual.
    if (!estado.expuesto) return;

    const duracionTotal = audio.duration || 0;

    if (duracionTotal > 0) {
      const margen = Math.min(DURACION_FRAGMENTO / 1000, duracionTotal * 0.9);
      audio.currentTime = Math.random() * (duracionTotal - margen);
    }

    audio.play().catch(() => {
      /* Si el navegador bloquea la reproducción, no rompemos el resto del script. */
    });

    disco.classList.add("sonando");

    clearTimeout(estado.temporizador);
    estado.temporizador = setTimeout(() => {
      audio.pause();
      disco.classList.remove("sonando");
    }, DURACION_FRAGMENTO);
  };

  if (audio.readyState >= 1) {
    empezarFragmento();
  } else {
    audio.addEventListener("loadedmetadata", empezarFragmento, { once: true });
  }
}

discos.forEach((disco) => {
  // Desktop: mouse
  disco.addEventListener("mouseenter", () => {
    if (punteroTactil.matches) return;
    reproducirFragmentoAleatorio(disco);
  });

  disco.addEventListener("mouseleave", () => {
    if (punteroTactil.matches) return;
    detenerDisco(disco);
  });

  // Teclado: equivalente accesible del hover
  disco.addEventListener("focus", () => reproducirFragmentoAleatorio(disco));
  disco.addEventListener("blur", () => detenerDisco(disco));

  // Táctil: el toque alterna el estado
  disco.addEventListener("click", () => {
    if (!punteroTactil.matches) return;

    const yaActivo = disco.classList.contains("activo");

    discos.forEach((otro) => otro.classList.remove("activo"));

    if (yaActivo) {
      detenerDisco(disco);
    } else {
      disco.classList.add("activo");
      reproducirFragmentoAleatorio(disco);
    }
  });
});

// Si el dispositivo deja de ser táctil, limpiamos los estados sobrantes.
punteroTactil.addEventListener("change", () => {
  if (!punteroTactil.matches) {
    discos.forEach((disco) => {
      disco.classList.remove("activo");
      detenerDisco(disco);
    });
  }
});

// Si la pestaña deja de estar visible, cortamos cualquier audio en curso.
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    discos.forEach((disco) => detenerDisco(disco));
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
      "líder de proyecto ~ estructuración, documentación y deploy\n" +
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
// Imágenes de películas, discos y vinilos
// Si una imagen no existe o no carga, la quitamos para que se vea
// el degradé/fondo de respaldo en lugar del ícono de imagen rota.
// ---------------------------------------------------------

document
  .querySelectorAll(".fede-peli-img, .fede-funda-img, .fede-vinilo-img")
  .forEach((imagen) => {
    const quitar = () => imagen.remove();

    imagen.addEventListener("error", quitar);

    // La imagen pudo fallar antes de que este script se ejecutara.
    if (imagen.complete && imagen.naturalWidth === 0) quitar();
  });
