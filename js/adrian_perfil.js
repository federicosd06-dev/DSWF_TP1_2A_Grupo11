(() => {
  const ipDisplay = document.getElementById("ip-usuario");

  if (ipDisplay) {
    const ipServices = [
      "https://api64.ipify.org?format=json",
      "https://api.ipify.org?format=json",
    ];

    const isValidIp = (ip) => {
      const ipv4Parts = ip.split(".");
      if (ipv4Parts.length === 4) {
        return ipv4Parts.every(
          (part) => /^\d{1,3}$/.test(part) && Number(part) <= 255
        );
      }

      if (!ip.includes(":")) {
        return false;
      }

      const doubleColonParts = ip.split("::");
      if (doubleColonParts.length > 2) {
        return false;
      }

      const groups = doubleColonParts.join(":").split(":");
      if (
        groups.some((group) => !/^[0-9a-f]{1,4}$/i.test(group)) ||
        (doubleColonParts.length === 1 && groups.length !== 8) ||
        (doubleColonParts.length === 2 && groups.length >= 8)
      ) {
        return false;
      }

      return true;
    };

    const showIpMessage = (message, className) => {
      ipDisplay.replaceChildren();
      const messageElement = document.createElement("span");
      messageElement.className = className;
      messageElement.textContent = message;
      ipDisplay.append(messageElement);
    };

    const requestIp = async (serviceUrl) => {
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 8000);

      try {
        const response = await fetch(serviceUrl, {
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`La consulta de IP respondió ${response.status}.`);
        }

        const data = await response.json();
        const ip = typeof data.ip === "string" ? data.ip.trim() : "";

        if (!isValidIp(ip)) {
          throw new Error("El servicio devolvió una IP inválida.");
        }

        return ip;
      } finally {
        window.clearTimeout(timeoutId);
      }
    }

    const detectPublicIp = async () => {
      for (const serviceUrl of ipServices) {
        try {
          return await requestIp(serviceUrl);
        } catch (error) {
          console.warn("No se pudo consultar el servicio de IP pública.", error);
        }
      }

      throw new Error("No hay servicios de IP pública disponibles.");
    };

    detectPublicIp()
      .then((ip) => {
        showIpMessage(ip, "ip-detectada");
      })
      .catch(() => {
        showIpMessage("No se pudo detectar la IP pública", "ip-error");
      });
  }

  const cards = document.querySelectorAll(".cuadro-marco-card");

  cards.forEach((card) => {
    const toggleCard = () => {
      const isFlipped = card.classList.toggle("girada");
      card.setAttribute("aria-pressed", String(isFlipped));
    };

    card.addEventListener("click", toggleCard);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleCard();
      }
    });

    card.setAttribute("aria-pressed", "false");
  });
})();