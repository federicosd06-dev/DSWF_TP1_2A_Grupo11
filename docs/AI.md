## Uso de IA y criterio de autoría

Durante el desarrollo del proyecto se utilizaron herramientas de Inteligencia Artificial como asistentes técnicos y creativos, principalmente para explorar soluciones de código, debugging, accesibilidad, contraste visual y redacción de contenidos.

Las propuestas se analizaron en función de la estructura real del proyecto, se probaron en el navegador y, cuando fue necesario, se modificaron o descartaron.

El criterio utilizado fue que el equipo pudiera comprender qué hacía cada solución, verificar su funcionamiento y justificar las decisiones antes de incorporarlas al proyecto.

No se utilizaron imágenes generadas por IA para representar a los integrantes del equipo. En los recursos gráficos se utilizaron únicamente SVGs simples.

### Herramientas utilizadas

| Herramienta  | Modelo / modalidad              | Acceso                        | Uso dentro del proyecto                                                                       |
| ------------ | ------------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------- |
| **ChatGPT**  | GPT-5.6 Luna                    | Gratuito                      | Asistencia para lógica JavaScript, animaciones, debugging, accesibilidad y análisis técnico   |
| **Claude**   | Claude Sonnet 5                 | Gratuito                      | Asistencia en JavaScript, tarjetas interactivas, accesibilidad y revisión de estructuras HTML |
| **Gemini**   | Gemini / acceso a funciones Pro | Gratuito con acceso extendido | Redacción, corrección y estructuración del contenido de la bitácora                           |
| **DeepSeek** | Chat de DeepSeek                | Gratuito                      | Herramienta disponible para consultas y apoyo puntual durante el desarrollo                   |


**Experiencia previa del equipo:** nivel intermedio, con práctica previa en el uso de asistentes conversacionales como apoyo para código y documentación.

---

### Casos representativos de uso

A continuación se documentan tres casos en los que la IA tuvo una participación concreta dentro del desarrollo.

#### 1. Animación Parallax / Tilt de las tarjetas - index.html y main.js

**Objetivo**

Se utilizó ChatGPT para analizar la lógica matemática y geométrica necesaria para implementar una animación de tipo *parallax/tilt* sobre las tarjetas de integrantes.

La intención no era que la IA definiera el diseño visual del sitio, sino utilizarla como apoyo para comprender cómo calcular la posición del cursor respecto del centro de una tarjeta y transformar esa posición en movimientos proporcionales.

**Prompt utilizado**

> Quiero implementar una animación de tipo parallax/tilt para unas tarjetas de integrantes en una página web hecha solamente con HTML, CSS y JavaScript.
>
> La idea es que, cuando el mouse se mueve sobre una tarjeta:
>
> * La tarjeta se incline siguiendo la posición del mouse.
> * El contenido interno tenga un desplazamiento pequeño siguiendo el movimiento.
> * El avatar tenga un desplazamiento mayor para generar sensación de profundidad.
> * El movimiento dependa de la distancia del cursor respecto del centro de la tarjeta.
> * Otras tarjetas puedan escalar ligeramente.
>
> Quiero entender principalmente la parte matemática/geométrica: cómo obtener la posición del mouse respecto de la tarjeta, calcular la distancia o desplazamiento respecto del centro y utilizar esos valores para `rotateX`, `rotateY` y `translate3d`, utilizando diferentes multiplicadores para controlar la intensidad y evitando movimientos excesivos.

**Propuesta inicial**

Entre las soluciones propuestas apareció una lógica basada en obtener las dimensiones y posición de la tarjeta mediante `getBoundingClientRect()` y calcular la posición del cursor respecto de su centro:

```js
const rect = tarjeta.getBoundingClientRect();

const x = evento.clientX - rect.left - rect.width / 2;
const y = evento.clientY - rect.top - rect.height / 2;

const rotateX = (-y / rect.height) * 16;
const rotateY = (x / rect.width) * 16;

tarjeta.style.transform =
  `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

tarjetaIzquierda.style.transform =
  `translate3d(${x / rect.width * 20}px, ${y / rect.height * 20}px, 20px)`;

avatar.style.transform =
  `translate3d(${x / rect.width * 45}px, ${y / rect.height * 45}px, 45px)`;
```

**Adaptaciones realizadas**

La propuesta inicial se utilizó como punto de partida y se modificó para adaptarla al comportamiento buscado:

1. **Normalización de la posición:** La posición queda expresada aproximadamente entre `-1` y `1`, independientemente del tamaño de la tarjeta. Esto facilita interpretar y modificar los valores posteriores.

2. **Separación de los valores de intensidad:** Se definieron por separado los valores utilizados para la rotación y para los distintos desplazamientos. Esto permite modificar fácilmente la intensidad de cada efecto.

3. **Optimización de los eventos del mouse:** Finalmente, se incorporó `requestAnimationFrame()` para controlar las actualizaciones visuales producidas por `mousemove`. En lugar de intentar aplicar todos los cambios directamente cada vez que se dispara el evento, se agrupan las actualizaciones para realizarlas siguiendo el ciclo de renderizado del navegador.

---

#### 2. Bitácora — `bitacora.html`, `bitacora.js` y `bitacoraData.js`

Para esta parte del proyecto se utilizaron dos herramientas de IA con propósitos distintos y complementarios: **Claude Sonnet 5**, para analizar y resolver aspectos relacionados con el comportamiento en JavaScript, la estructura HTML y la accesibilidad del acordeón, y **Gemini**, para redactar, resumir y estructurar el contenido de las entradas antes de pasarlo a código.


**2.1. Claude Sonnet 5 — Acordeón y estructura accesible**

**Objetivo**

El aporte principal de Claude estuvo relacionado con la lógica del acordeón, trabajando sobre el HTML y JavaScript que ya estaban armados. También se utilizó durante las primeras iteraciones visuales de la bitácora para explorar el diseño de la línea de tiempo y sus ajustes de tamaño.

La consulta principal surgió a partir de una revisión de la estructura HTML y accesibilidad. La implementación original generaba dinámicamente cada entrada mediante `.map()` y colocaba dentro de un `<button>` un `<div>` con la fecha y categoría y un `<h3>` con el título. Esto presentaba un problema porque un `<button>` no debe contener elementos como `<div>` ni encabezados. Además, al existir un único `<h1>` en la página, utilizar `<h3>` para las entradas suponía saltar un nivel de jerarquía.

La intención era corregir esta estructura sin perder el comportamiento existente, en el que todo el encabezado de cada entrada funcionaba como área clickeable, y utilizar `aria-controls` para indicar qué contenido controlaba cada botón.

**Prompt utilizado**

> Tengo este HTML con la estructura de la bitácora y este bitacoraData.js/bitacora.js que arma un acordeón: cada entrada se renderiza dinámicamente con .map() dentro de un `<button>` que contiene un `<div>` con la fecha y la categoría, y un `<h3>` con el título. Mi compañera me dijo que hay un problema: un `<button>` no puede contener un `<div>` ni un encabezado, solo contenido de frase (span, texto). Además, como en la página solo hay un `<h1>`, el `<h3>` salta un nivel y debería ser `<h2>`. El tema es que si separamos el encabezado del botón para que sea válido, perdemos que todo el header sea clickeable, que es como está pensado ahora. Explicame por qué pasa esto y ayudame a resolverlo antes de hacer el pull request; lo más importante es que el botón tenga aria-controls para indicar qué contenido controla.

**Propuesta inicial**

La solución propuesta fue reorganizar la estructura utilizando un `<h2>` para cada entrada, manteniendo dentro de este el botón y relacionándolo con el panel correspondiente mediante identificadores y atributos ARIA:

```html
<h2 class="timeline-titulo-wrapper">
  <button
    class="timeline-header"
    id="header-bitacora-{indice}"
    aria-expanded="false"
    aria-controls="panel-bitacora-{indice}">
    <span class="timeline-meta">
      <span class="timeline-fecha">entrada.fecha</span>
      <span class="{claseTag}">entrada.categoria</span>
    </span>
    <span class="timeline-titulo">{entrada.titulo}</span>
    <span class="timeline-icono" aria-hidden="true">+</span>
  </button>
</h2>

<div
  class="timeline-content"
  id="panel-bitacora-{indice}"
  role="region"
  aria-labelledby="header-bitacora-{indice}"
  aria-hidden="true">
  ...
</div>
```

**Adaptaciones realizadas**

La propuesta inicial funcionó como punto de partida, pero fue necesario adaptarla durante las pruebas para que coincidiera con la estructura real del proyecto:

1. **Corrección del selector del acordeón:** al envolver el botón dentro de un `<h2>`, `header.parentElement` dejó de apuntar directamente al `<article>` y pasó a apuntar al `<h2>`. Se reemplazó por `header.closest(".timeline-item")`, permitiendo localizar correctamente el artículo correspondiente sin depender de la profundidad exacta del DOM.

2. **Ajustes de CSS:** al reemplazar los elementos originales por `<span>`, estos pasaron a tener comportamiento `inline` por defecto. Por eso fue necesario agregar `display: flex` a `.timeline-meta` y `display: block` a `.timeline-titulo` para conservar la disposición visual buscada.

3. **Corrección del tipo de script:** `bitacora.js` utiliza `import` y `export`, por lo que el `<script>` que lo carga necesitaba `type="module"`. Sin esta configuración, el navegador no ejecutaba correctamente el módulo y las entradas no se mostraban.

4. **Restitución de `<main>`:** durante la reorganización del HTML se había perdido esta etiqueta. Se restituyó porque, además de funcionar como *landmark* para lectores de pantalla, en los estilos del proyecto se utilizaba para establecer el ancho máximo del contenido.

La implementación final mantiene la relación entre cada botón y su panel mediante `aria-expanded`, `aria-controls`, `aria-hidden`, `role="region"` y `aria-labelledby`.



**2.2. Gemini — Redacción y estructuración de las entradas**

**Objetivo**

Gemini se utilizó como asistente editorial y de estructuración de datos para transformar información de trabajo del equipo en entradas coherentes para `bitacoraData.js`.

El material de partida incluía borradores propios, notas de commits, tareas de los integrantes, conversaciones del grupo, problemas encontrados durante el desarrollo y sus respectivas soluciones.

La herramienta ayudó a corregir gramática y coherencia, resumir situaciones extensas, transformar notas sueltas en textos narrativos y mantener una redacción uniforme e impersonal, utilizando expresiones como “Se realizó” o “Se corrigió”. También se utilizó para eliminar el formato de checklist de las notas originales y organizar los conflictos técnicos de Git de manera resumida.

A nivel de código, las entradas se estructuraron con un formato común:

```js
const bitacoraData = [
  {
    fecha: "...",
    categoria: "...",
    titulo: "...",
    texto: "..."
  }
];

export { bitacoraData };
```

**Prompts utilizados**


1. **Definición del estilo narrativo y gramatical**

   > Voy a empezar a realizar la bitácora en un txt, para ir documentando todo y después pasarlo a código. Seguí la gramática española y tené como guía la redacción que usan los lingüistas españoles para corregir los errores de coherencia, estructurá la entrada adecuándola a como son las bitácoras, siguiendo un estilo narrativo uniforme, sin checklist.

2. **Estructuración hacia objetos JavaScript (`bitacoraData.js`)**

   > Teniendo en cuenta esta estructura: `const bitacoraData = [{ fecha: "18 de septiembre de 2026", categoria: "Estructura", titulo: "Estructura base del proyecto", texto: "..." }]; export { bitacoraData };` armá lo mismo para estas entradas de la bitácora, teniendo en cuenta que sea un resumen de lo que pasó y que no sea tan detallista: [notas de commits y tareas de los integrantes].

3. **Procesamiento de conflictos de Git y conversaciones grupales**

   > Hoy nos surgió este problema: [detalles del PR], y después hizo esto: [detalles del revert], y se solucionó así: [revert del revert]. Esta es la conversación de lo sucedido: [chat del grupo]. Ahora a todo esto dale una estructura para ponerlo como entrada para la bitácora, separando los conflictos y las soluciones de manera resumida.

**Adaptaciones realizadas**

Los textos generados se contrastaron con el desarrollo real antes de incorporarlos a `bitacoraData.js`. Se revisaron las fechas, los hechos y las soluciones descriptas para evitar incorporar información incorrecta, y también se ajustó la agrupación de las entradas para que representara correctamente el proceso de trabajo del equipo.

---

#### 3. Tarjetas Flip y contraste — `perfil_cande.html` y `cande_perfil.js`


**3.1. Tarjetas Flip**

**Objetivo**

Se utilizó Claude para analizar la implementación de tarjetas con dos caras, una frontal con el póster y otra posterior con una reseña, que debían girar `180deg` sobre el eje Y mediante clic y poder activarse también mediante teclado.

**Prompt utilizado**

> Tengo una tarjeta con dos caras (frente con el póster y dorso con una reseña) hecha solo con HTML, CSS y JS. Quiero que gire 180 grados en el eje Y al hacer click, mostrando la cara de atrás sin que se vea el frente al revés ni se transparente. Ayudame con la parte de CSS 3D (`perspective`, `backface-visibility`, la transición del giro) y con el JS mínimo para togglear el estado con click y con teclado.

**Adaptaciones realizadas**

La propuesta inicial funcionó como punto de partida, pero se modificó para adaptarla al proyecto:

1. **Compatibilidad visual:** se agregó el prefijo `-webkit-backface-visibility`, porque sin él Safari mostraba el frente y el dorso superpuestos y transparentes al mismo tiempo durante el giro.

2. **Reutilización de la lógica:** la función de inicialización se diseñó para recibir el identificador del contenedor, permitiendo reutilizar la misma lógica en distintas grillas sin duplicar el código.

3. **Corrección de un bug propio:** se detectó que la función de inicialización se estaba llamando dos veces sobre la misma grilla. Esto dejaba dos listeners de `click` asociados a cada tarjeta y hacía que el `toggle` se cancelara a sí mismo en cada clic. Se eliminó la inicialización duplicada.



**3.2. Contraste de color**

**Objetivo**

También se utilizó Claude para analizar un problema de contraste detectado mediante una herramienta de accesibilidad del navegador. El objetivo era encontrar una alternativa que cumpliera con WCAG sin perder la identidad visual rosa del perfil.

**Prompt utilizado**

> Una herramienta de accesibilidad del navegador me marca un error de contraste en el texto de un botón (ratio 3.53, no llega al mínimo de WCAG). El fondo es un rosa (`#ec4899`) y el texto es blanco. Explicame cómo se calcula el ratio de contraste según WCAG y ayudame a elegir un color de fondo que sí cumpla, sin perder la identidad rosa del resto del perfil.

**Análisis y adaptaciones realizadas**

La herramienta explicó que el contraste se calcula mediante:

```text
(L1 + 0.05) / (L2 + 0.05)
```

donde `L1` y `L2` representan las luminancias relativas de los dos colores. La luminancia se obtiene a partir de los canales RGB linealizados y sus respectivos pesos:

```text
0.2126 × rojo
+ 0.7152 × verde
+ 0.0722 × azul
```

Con esta fórmula, el texto blanco sobre `#ec4899` producía un contraste de **3.53:1**, inferior al mínimo de **4.5:1** para texto normal.

A partir de este análisis se realizaron las siguientes modificaciones:

1. **Reutilización de un color existente:** se probó un magenta más oscuro, `#831843`, que ya estaba presente en el dorso de las tarjetas. El resultado fue un contraste de **9.65:1** con texto blanco, por lo que se pudo solucionar el problema sin incorporar un color ajeno a la paleta existente.

2. **Adaptación a los dos temas:** se detectó que el problema también aparecía en otros textos rosas, como los títulos de sección y el resultado de la ruleta. Además, un único color fijo no garantizaba contraste suficiente en ambos temas: sobre el fondo claro era necesario utilizar un rosa más oscuro y sobre el fondo oscuro uno más claro. Por eso se definieron valores diferentes según el tema.

3. **Corrección de las etiquetas de habilidades:** se detectó un contraste de **2.72:1** en modo claro debido al uso de texto rosa sobre un fondo rosa muy transparente. Se reemplazó esta combinación por un fondo sólido con texto blanco, obteniendo un contraste mayor y manteniendo la legibilidad en ambos temas.

---

### Conclusión

El uso de Inteligencia Artificial durante el proyecto se planteó como una herramienta de apoyo para aprender, investigar, depurar, documentar y explorar alternativas, y no como un mecanismo para delegar la totalidad del desarrollo.

Los casos documentados muestran diferentes formas de utilización:

1. **Asistencia técnica:** análisis de cálculos, JavaScript, CSS y animaciones.
2. **Debugging:** detección y resolución de problemas durante las pruebas.
3. **Accesibilidad:** análisis de estructura semántica, navegación y contraste.
4. **Asistencia creativa y documental:** redacción y organización de la bitácora.

En todos los casos, el resultado final fue adaptado al proyecto concreto y verificado antes de incorporarse al repositorio.
