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
  },
  {
    fecha: "25 de septiembre de 2026",
    categoria: "Estructura",
    titulo: "Incorporación de la sección Bitácora",
    texto: "Se desarrolló la página de bitácora para documentar el proceso del equipo. Se maquetó la estructura HTML, se aplicaron estilos con tipografía fluida, se implementó su lógica interactiva en JavaScript y se verificó la navegación interna."
  },
  {
    fecha: "25 de septiembre de 2026",
    categoria: "Mantenimiento",
    titulo: "Limpieza de código y corrección de sintaxis",
    texto: "Se aplicaron mejoras generales de accesibilidad, limpieza de código y se solucionó un bug menor de sintaxis (un cierre de corchete faltante)."
  },
  {
    fecha: "26 de septiembre de 2026",
    categoria: "Accesibilidad",
    titulo: "Corrección de accesibilidad en el acordeón",
    texto: "Se reestructuró el HTML del acordeón de la bitácora para garantizar su validez. Se corrigió la jerarquía de encabezados, se eliminaron etiquetas inválidas dentro de los botones y se añadieron atributos ARIA para su correcta interpretación por lectores de pantalla."
  },
  {
    fecha: "25 de septiembre de 2026",
    categoria: "Organización",
    titulo: "Acuerdo de modularización del CSS por perfil",
    texto: "Se estableció como acuerdo del equipo separar los estilos CSS en archivos independientes según el perfil de cada integrante. Esta medida busca evitar conflictos de fusión (merge conflicts) en la hoja global, facilitar las revisiones de código y agilizar el mantenimiento individual."
  },
  {
    fecha: "26 de septiembre de 2026",
    categoria: "Dificultades",
    titulo: "Conflicto por reversión inadvertida y ruptura de enlaces",
    texto: "Tras el merge de la rama Feature/icon GitHub (#10), se creó y fusionó un PR de revert (#11) guiado por IA sin previa revisión del equipo. Esto provocó una reubicación desorganizada de 578 líneas de código CSS hacia la hoja global styles.css y rompió el enlace hacia la bitácora desde el perfil de Victoria al no incluir la referencia al directorio padre (solicitando integrantes/bitacora.html en lugar de ../bitacora.html)."
  },
  {
    fecha: "26 de septiembre de 2026",
    categoria: "Soluciones",
    titulo: "Restauración mediante 'Revert del Revert' y protocolo de flujo de trabajo",
    texto: "Para restaurar el estado estable, se realizó una reversión del PR previo ('Revert Revert Feature/icon GitHub'). A través del canal de comunicación del equipo, se aclaró el origen del problema y se establecieron acuerdos de trabajo estrictos: prohibición de auto-aprobar o auto-mergear PRs propios, evaluación crítica de las respuestas de la IA antes de ejecutar comandos en Git y obligación de consultar al grupo o enviar capturas ante cualquier duda técnica antes de alterar el repositorio compartido."
  },
  {
  fecha: "27 de septiembre de 2026",
  categoria: "Documentación",
  titulo: "Finalización del README.md, guía técnica y documentación para la presentación",
  texto: "Se completó la redacción integral del archivo README.md obligatorio para la entrega final del proyecto. Se consolidaron los enlaces de GitHub y del deploy en Vercel, la estructura general del proyecto, la matriz de roles y responsabilidades de los integrantes y las guías de ejecución local (Live Server).\n\nAsimismo, se incluyó la documentación técnica de JavaScript explicando el funcionamiento de scripts principales: main.js (efecto 3D en tarjetas) y bitacora.js (inyección dinámica de entradas). Finalmente, se registró formalmente la declaración sobre el uso ético y asistencial de la IA en tareas de matemáticas para animaciones 3D, persistencia y depuración responsive."
}


];
export { bitacoraData };