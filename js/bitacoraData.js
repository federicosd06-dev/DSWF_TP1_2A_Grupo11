// js/log-data.js
const bitacoraData = [
  {
    fecha: "18 de septiembre de 2026",
    categoria: "Estructura",
    titulo: "Estructura base del proyecto",
    texto: "Se realizó la organización del proyecto y la división equitativa de tareas entre los integrantes. A continuación, se creó el repositorio en GitHub y se estructuraron los archivos en las carpetas solicitadas (CSS, imágenes y JS), incorporando un HTML con la portada y una hoja de estilos con una paleta de colores provisoria, a la espera de la guía de estilos definitiva. Finalmente, se realizó el deploy de la página en Vercel."
  },
  {
    fecha: "19 de septiembre de 2026",
    categoria: "Diseño",
    titulo: "Diseño de portada y perfiles individuales",
    texto: "Se discutió si cada perfil individual necesitaba una animación propia distinta a la de los demás, ya que la consigna menciona la uniformidad como criterio de corrección: se interpretó que las tarjetas pueden ser diferentes entre sí, pero deberían guardar un parentesco visual —una especie de identidad compartida— sin llegar a ser idénticas."
  },
  {
    fecha: "22 de septiembre de 2026",
    categoria: "Diseño",
    titulo: "Definición de estilo compartido entre perfiles",
    texto: "Se decidió conservar la base existente, ya que su simplicidad permite que cada integrante desarrolle su perfil individual sin generar conflictos de diseño entre sí. Como resultado, se acordó adoptar una misma estructura, tipografía (Poppins) y paleta de colores en todos los perfiles, dejando a cada integrante la libertad de sumar una animación o interacción propia que aporte un toque personal sin romper la cohesión visual del sitio."
  },
  {
    fecha: "22 de septiembre de 2026",
    categoria: "Navegación",
    titulo: "Navegación secundaria entre perfiles y corrección de bug",
    texto: "Se confirmó que ningún recorrido dentro del sitio puede depender del botón “Atrás” del navegador, por lo que se propuso incorporar una segunda navegación dentro de cada perfil individual, que permita pasar directamente de un perfil a otro y cierre el recorrido en el primero, además del enlace de regreso al inicio ya disponible en el menú principal."
  },
  {
    fecha: "22 de septiembre de 2026",
    categoria: "Bug detectado",
    titulo: "Corrección de bug",
    texto: "Durante las pruebas de interacción, se reportó un error a corregir: al volver desde un perfil mediante el botón de retroceso del navegador, la tarjeta correspondiente en la portada queda incorrectamente marcada como seleccionada, cuando debería perder ese estado."
  },
  {
    fecha: "23 de septiembre de 2026",
    categoria: "Bug resuelto",
    titulo: "Resolución del bug de foco en tarjetas",
    texto: "Se corrigió el bug reportado en la entrada anterior, relacionado con el foco de las tarjetas de la portada. La solución consistió en reemplazar la propiedad :focus-within por :has(:focus-visible), de modo que la expansión por teclado ocurra únicamente cuando el foco es realmente visible para el usuario."
  },
  {
    fecha: "23 de septiembre de 2026",
    categoria: "Diseño",
    titulo: "Rediseño del banner",
    texto: "Se rediseñó parcialmente la sección hero, que de ahora en más pasa a llamarse banner, sumándole una textura decorativa y adaptando su comportamiento para pantallas pequeñas."
  }
];