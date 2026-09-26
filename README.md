## Link github del proyecto

https://github.com/federicosd06-dev/DSWF_TP1_2A_Grupo11

## Link del deploy del proyecto.

https://dswf-tp-1-2-a-grupo11.vercel.app/


# Equipo 11 - Sitio web grupal

Sitio web desarrollado para el **Trabajo Práctico Grupal N° 1 de la Materia Desarrollo de Sistemas Web (Front End)** de la
comisión "A" del IFTS N.º 29. El proyecto presenta al Grupo 11 de estudiantes de
Desarrollo de Software mediante una portada común, una página de bitácora y un
perfil individual para cada integrante.

Es una aplicación web estática: no utiliza backend, framework ni sistema de
compilación. Todo el contenido se sirve directamente desde archivos HTML, CSS,
JavaScript e imágenes.

## Contenido del sitio

- **Inicio (`index.html`)**: presentación del grupo y tarjetas con los cinco
  integrantes.
- **Bitácora (`bitacora.html`)**: acceso preparado desde la navegación global
  para el registro del proceso del trabajo.
- **Perfiles individuales de cada integrante del grupo**:
 
## Funcionalidades compartidas

- Navegación entre inicio, bitácora y sección “¿Quiénes somos?”.
- Menú hamburguesa para pantallas pequeñas.
- Cambio entre tema claro y oscuro.
- Persistencia del tema elegido mediante `localStorage`.
- Tarjetas del equipo con efecto 3D en dispositivos con puntero preciso.
- Foco visible y controles navegables por teclado.
- Diseño responsive para escritorio, tablet y móvil.

## Tecnologías

- HTML5 semántico.
- CSS3, variables personalizadas, media queries, transiciones y animaciones.
- JavaScript moderno sin dependencias externas.
- Google Fonts (familia **Poppins**).
- Algunas portadas e imágenes se cargan desde servicios externos; el resto de
  los recursos visuales se encuentra en `img/`.

## Estructura del proyecto

## Estructura del proyecto

```text
ParaUsbir/
├── index.html                         # Página principal del sitio
├── bitacora.html                      # Página de bitácora del proyecto
├── README.md                          # Documentación del proyecto
├── .gitignore                         # Archivos y carpetas ignorados por Git
│
├── integrantes/                       # Perfiles individuales de los integrantes
│   ├── perfil_adrian.html
│   ├── perfil_cande.html
│   ├── perfil_fede.html
│   ├── perfil_marcos.html
│   └── perfil_victoria.html
│
├── css/                               # Hojas de estilo del proyecto
│   ├── styles.css                     # Estilos generales y diseño responsive
│   ├── perfil_javier.css              # Estilos del perfil de Javier
│   ├── styles_knd.css                 # Estilos del perfil de KND
│   └── styles_ria.css                 # Estilos del perfil de Ria
│
├── js/                                # Scripts JavaScript
│   ├── main.js                        # Navegación, menú y cambio de tema
│   ├── bitacora.js                    # Renderizado e interacción de la bitácora
│   ├── bitacoraData.js                # Datos utilizados por la bitácora
│   ├── adrian_perfil.js               # Interacciones del perfil de Adrián
│   ├── cande_perfil.js                # Interacciones del perfil de Candelaria
│   ├── fede_perfil.js                 # Interacciones del perfil de Federico
│   ├── marcos_perfil.js               # Interacciones del perfil de Marcos
│   └── victoria_perfil.js             # Interacciones del perfil de Victoria
│
├── img/                               # Imágenes y recursos multimedia
│   ├── about-time.jpg
│   ├── benjamin-button.webp
│   ├── debi-tirar-mas-fotos.png
│   ├── la-vida-era-mas-corta.jpg
│   ├── luzbelito.jpg
│   ├── machito_marcos.jpeg
│   ├── padrino-2.webp
│   ├── perfil.jpeg
│   │
│   ├── Javier/                        # Imágenes utilizadas en el perfil de Javier
│   │   ├── GunsNRosesUseYourIllusionICDCover.jpg
│   │   ├── Hackerss.jpeg
│   │   ├── Soda-Stereo-Cancion-animal-primera-portada.jpg
│   │   ├── interestelar.jpg
│   │   ├── oasis.jpeg
│   │   └── the_matrix.jpg
│   │
│   ├── knd/                           # Imágenes utilizadas en el perfil de KND
│   │   ├── poster-melancholia.jpg
│   │   ├── poster-suspiria.jpg
│   │   ├── poster-the shinning.png
│   │   ├── radiohead-amnesiac.jpg
│   │   ├── sui_generis-vida.png
│   │   └── ultraviolence-lana_del_rey.png
│   │
│   └── ria/                           # Imágenes utilizadas en el perfil de Ria
│       ├── co.jpg
│       ├── dnd.jpg
│       ├── hmc.jpg
│       ├── lort.jpg
│       ├── lse.jpg
│       ├── sami100.jpg
│       └── ynwa.webp
│
└── adrian_perfil.js                   # Archivo JavaScript adicional ubicado en la raíz

## Cómo ejecutar el proyecto

No es necesario instalar dependencias. Se puede abrir `index.html` directamente
en un navegador, aunque se recomienda utilizar un servidor local para que todos
los recursos y las llamadas externas se comporten de forma consistente.

Para descargar el proyecto utilizar git clone https://github.com/federicosd06-dev/DSWF_TP1_2A_Grupo11.git

Luego cd ../proyecto Terminado\DSWF_TP1_2A_Grupo11

Doble click sobre el archivo index.html

### Opción 1: Visual Studio Code

1. Abrir la carpeta del proyecto en Visual Studio Code.
2. Instalar la extensión **Live Server** (si todavía no está instalada).
3. Hacer clic derecho sobre `index.html`.
4. Elegir **Open with Live Server**.

### Opción 2: servidor local con Python

## Equipo y responsabilidades

Las responsabilidades mostradas en la portada son:

| Integrante | Área principal |

👤 Fede: (Coordinador & Desarrollador Frontend)
- Tareas: Creación del repositorio, Vercel, portada (index.html), rotación JS (main.js) y perfil-1.html.

👤 Ria: (Diseño CSS & Responsive Design)
- Tareas: Archivo styles.css global, guía de estilos (colores, Google Fonts) y prueba de breakpoints (400px, 900px, 1200px) + perfil-2.html.

👤 cande: (Bitácora & Navegación)
- Tareas: Maquetación y redacción de bitacora.html (decisiones, problemas, soluciones) y verificación de enlaces + perfil-3.html.

👤Javier: INTEGRANTE 4: (Documentación README.md & Registro IA)
- Tareas: Redacción del README.md obligatorio (capturas, explicaciones JS, uso de IA, prompts) + perfil-4.html.

👤 Marcos INTEGRANTE 5: (QA, Testing & Recursos Multimedia)
- Tareas: Optimización de imágenes en /img, testing de desbordes responsive y consola JS + perfil-5.html.


