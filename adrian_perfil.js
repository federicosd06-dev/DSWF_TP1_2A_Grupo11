/**
 * ===================================================
 * INTERACCIÓN DINÁMICA DEL PERFIL DE ADRIAN JAVIER CANO
 * 1. Giro 3D accesible para cuadros de películas y discos
 * 2. Terminal interactiva y móvil con items y exploit simulado
 * 3. Detección y visualización de la dirección IP del visitante
 * ===================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // 0. Avatar 3D giratorio (Perro <-> Trinity)
  const avatarFlipContainer = document.getElementById("avatar-flip-container");
  const avatarFlipInner = document.getElementById("avatar-flip-inner");

  if (avatarFlipContainer && avatarFlipInner) {
    let rotacionAvatar = 0;

    function girarAvatar() {
      rotacionAvatar += 180;
      avatarFlipInner.style.transform = `rotateY(${rotacionAvatar}deg)`;

      // Alternar etiquetas accesibles según la imagen visible
      const esTrinity = (rotacionAvatar / 180) % 2 !== 0;
      if (esTrinity) {
        avatarFlipContainer.setAttribute("aria-label", "Foto de perfil alternativa: Trinity. Hacé clic para volver a la imagen del perro");
        avatarFlipContainer.setAttribute("title", "Hacé clic para volver a la imagen del perro");
      } else {
        avatarFlipContainer.setAttribute("aria-label", "Foto de perfil de Adrian Javier Cano (Perro). Hacé clic para girar y ver a Trinity");
        avatarFlipContainer.setAttribute("title", "Hacé clic para girar y ver a Trinity");
      }
    }

    avatarFlipContainer.addEventListener("click", girarAvatar);

    avatarFlipContainer.addEventListener("keydown", (evento) => {
      if (evento.key === "Enter" || evento.key === " ") {
        evento.preventDefault();
        girarAvatar();
      }
    });
  }

  // 1. Inicialización de Giros 3D en las tarjetas con marco
  const cuadrosCards = document.querySelectorAll(".cuadro-marco-card");

  cuadrosCards.forEach((cuadro) => {
    // Giro al hacer clic
    cuadro.addEventListener("click", () => {
      cuadro.classList.toggle("girada");
    });

    // Accesibilidad por teclado (Enter o Barra Espaciadora)
    cuadro.addEventListener("keydown", (evento) => {
      if (evento.key === "Enter" || evento.key === " ") {
        evento.preventDefault();
        cuadro.classList.toggle("girada");
      }
    });
  });

  // 2. Terminal interactiva y móvil corriendo los items de la sección y exploit de mentira
  const terminalConsola = document.getElementById("terminal-consola");
  const btnReplay = document.getElementById("btn-replay-terminal");

  if (terminalConsola) {
    const secuenciaTerminal = [
      { tipo: "cmd", prompt: "adrian@matrix:~$", comando: "sys --profile" },
      { tipo: "info", texto: "<strong>[i] Identidad:</strong> Adrian Javier Cano" },
      { tipo: "info", texto: "<strong>[i] Rol:</strong> IA Multiagéntica & Ciberseguridad" },
      { tipo: "info", texto: "<strong>[i] Ubicación:</strong> Mendoza, Argentina" },
      { tipo: "info", texto: "<strong>[i] Edad:</strong> 48 años" },
      { tipo: "info", texto: "<strong>[i] Módulos:</strong> [IA Multiagéntica, Ciberseguridad, Derecho Informático, IA y Derecho]" },
      { tipo: "cmd", prompt: "adrian@matrix:~$", comando: "./matrix_exploit.sh --target=mainframe" },
      { tipo: "step", texto: "[*] Escaneando puertos del nodo... 22, 80, 443 [ABIERTO]" },
      { tipo: "step", texto: "[*] Inyectando payload en buffer de memoria 0x7ffd9b8f... [OK]" },
      { tipo: "step", texto: "[*] Neutralizando centinelas y saltando sandbox... [BYPASS]" },
      { tipo: "exploit", texto: "<strong>[!] EXPLOIT EJECUTADO CON ÉXITO: ACCESO ROOT CONCEDIDO</strong>" },
      { tipo: "root", prompt: "root@matrix:~#", comando: "" }
    ];

    let ejecutando = false;
    let timeoutId = null;

    function scrollTerminal() {
      terminalConsola.scrollTop = terminalConsola.scrollHeight;
    }

    function iniciarTerminal() {
      if (ejecutando) return;
      ejecutando = true;
      terminalConsola.innerHTML = "";

      let indice = 0;

      function ejecutarPaso() {
        if (indice >= secuenciaTerminal.length) {
          ejecutando = false;
          return;
        }

        const linea = secuenciaTerminal[indice];
        indice++;

        if (linea.tipo === "cmd") {
          // Escritura progresiva del comando letra por letra
          const lineaElem = document.createElement("div");
          lineaElem.className = "terminal-line";
          lineaElem.innerHTML = `<span class="terminal-prompt">${linea.prompt}</span> <span class="terminal-cmd"></span><span class="terminal-cursor">_</span>`;
          terminalConsola.appendChild(lineaElem);
          scrollTerminal();

          const cmdSpan = lineaElem.querySelector(".terminal-cmd");
          const cursor = lineaElem.querySelector(".terminal-cursor");
          let charIdx = 0;
          const texto = linea.comando;

          const intervaloChar = setInterval(() => {
            cmdSpan.textContent += texto[charIdx];
            charIdx++;
            scrollTerminal();
            if (charIdx >= texto.length) {
              clearInterval(intervaloChar);
              cursor.remove();
              timeoutId = setTimeout(ejecutarPaso, 400);
            }
          }, 35);
        } else if (linea.tipo === "root") {
          // Línea final con prompt root
          const lineaElem = document.createElement("div");
          lineaElem.className = "terminal-line terminal-root";
          lineaElem.innerHTML = `<span class="terminal-prompt-root">${linea.prompt}</span> <span class="terminal-cursor">_</span>`;
          terminalConsola.appendChild(lineaElem);
          scrollTerminal();
          ejecutando = false;
        } else {
          // Línea de información o paso de exploit
          const lineaElem = document.createElement("div");
          lineaElem.className = `terminal-line terminal-${linea.tipo}`;
          lineaElem.innerHTML = `<span class="terminal-text">${linea.texto}</span>`;
          terminalConsola.appendChild(lineaElem);
          scrollTerminal();

          const retardo = linea.tipo === "exploit" ? 700 : (linea.tipo === "step" ? 350 : 250);
          timeoutId = setTimeout(ejecutarPaso, retardo);
        }
      }

      ejecutarPaso();
    }

    // Iniciar automáticamente luego de 500ms
    setTimeout(iniciarTerminal, 500);

    if (btnReplay) {
      btnReplay.addEventListener("click", () => {
        clearTimeout(timeoutId);
        ejecutando = false;
        iniciarTerminal();
      });
    }
  }

  // 3. Detección de la dirección IP del navegante (mostrada en grande y verde)
  const displayIP = document.getElementById("ip-usuario");

  if (displayIP) {
    async function detectarIP() {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      try {
        const respuesta = await fetch("https://api.ipify.org?format=json", {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        if (!respuesta.ok) throw new Error("Error de conexión");
        const datos = await respuesta.json();
        displayIP.textContent = datos.ip || "10.2.2.2";
      } catch (error) {
        clearTimeout(timeoutId);
        try {
          const respFallback = await fetch("https://api64.ipify.org?format=json");
          if (!respFallback.ok) throw new Error("Error en fallback");
          const datosFallback = await respFallback.json();
          displayIP.textContent = datosFallback.ip || "10.2.2.2";
        } catch (e) {
          displayIP.textContent = "10.2.2.2";
        }
      }
    }

    detectarIP();
  }
});
