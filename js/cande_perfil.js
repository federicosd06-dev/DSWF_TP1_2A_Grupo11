// Interacción dinámica del perfil de Cande
// 1. Tarjetas Flip manuales
// 2. Recomendador dinámico (Gadget TP1)

function iniciarFlipCards(idContenedor) {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) return;
  const tarjetas = contenedor.querySelectorAll(".flip-card");

  tarjetas.forEach((tarjeta) => {
    // Giro al hacer clic
    tarjeta.addEventListener("click", () => {
      tarjeta.classList.toggle("girada");
    });

    // Accesibilidad: giro con teclado
    tarjeta.addEventListener("keydown", (evento) => {
      if (evento.key === "Enter" || evento.key === " ") {
        evento.preventDefault();
        tarjeta.classList.toggle("girada");
      }
    });
  });
}

// Inicializar giros en ambas grillas
// (antes esto se llamaba dos veces para "flip-peliculas", lo que
// duplicaba el listener de click y hacía que el toggle se cancelara
// a sí mismo en cada click — por eso las tarjetas no giraban)
iniciarFlipCards("flip-peliculas");
iniciarFlipCards("flip-discos");

// ==========================================
// NUEVO: Lógica del Recomendador Dinámico
// ==========================================
const btnRecomendar = document.getElementById("btn-mi-interaccion");
const contenedorResultado = document.getElementById("resultado-interaccion");
const tarjetasPeliculas = document.querySelectorAll("#flip-peliculas .flip-card");

// Reseñas que coinciden en orden con las películas de tu HTML 
// (0: The Shining, 1: Suspiria, 2: Melancholia)
const resenas = [
  "¡The Shining! Ideal si buscás terror psicológico asfixiante con una actuación inolvidable.",
  "¡Suspiria! Preparate para una paleta de colores vibrante y una banda sonora hipnótica.",
  "¡Melancholia! Perfecta para reflexionar con una cinematografía visualmente deslumbrante."
];

if (btnRecomendar && contenedorResultado && tarjetasPeliculas.length > 0) {
  btnRecomendar.addEventListener("click", () => {
    // 1. Resetear el estado de todas las tarjetas
    tarjetasPeliculas.forEach(tarjeta => {
      tarjeta.classList.remove("girada", "destacada");
    });
    
    // Feedback visual mientras "piensa"
    contenedorResultado.textContent = "Girando la ruleta...";
    btnRecomendar.disabled = true;
    btnRecomendar.style.opacity = "0.7";

    // 2. Retraso simulado para generar suspenso
    setTimeout(() => {
      // Elegir índice al azar (0, 1 o 2)
      const indiceAleatorio = Math.floor(Math.random() * tarjetasPeliculas.length);
      const peliculaGanadora = tarjetasPeliculas[indiceAleatorio];

      // Girar automáticamente y aplicar la clase que la hace más grande
      peliculaGanadora.classList.add("girada", "destacada");
      
      // Mostrar tu reseña personalizada
      contenedorResultado.textContent = resenas[indiceAleatorio];
      
      // Restaurar el botón
      btnRecomendar.disabled = false;
      btnRecomendar.style.opacity = "1";
    }, 800); // 800ms de animación
  });
}