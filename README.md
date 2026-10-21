# 🎓 Mapa Interactivo - Plan de Estudios
### Ingeniería en Computación (Plan 2018)

Una aplicación web moderna, interactiva y responsiva para que **cualquier estudiante** de la carrera pueda visualizar el mapa curricular, entender el régimen de correlatividades oficiales, cargar sus notas, calcular su promedio y definir estrategias de cursada y finales.

---

## ✨ Características Principales

- **Diseñado para Cualquier Estudiante:** La aplicación inicia limpia (en blanco) para cada nuevo usuario. Podés ingresar tu nombre para personalizar tu tablero y cargar tus notas personales.
- **Trazado Dinámico de Correlativas:** Al seleccionar o pasar el cursor por encima de una materia, se dibujan conexiones visuales y se resaltan con colores:
  - 🟡 **Amarillo:** Materias que necesitás regularizar para cursar.
  - 🟢 **Verde:** Materias que necesitás aprobar para cursar.
  - 🟣 **Violeta:** Requisitos para rendir examen final.
  - 🔵 **Celeste:** Materias futuras que esta asignatura desbloquea.
- **6 Estados de Materia:**
  - 🟢 **Aprobada:** Examen final o promoción.
  - 🟡 **Regular:** Cursada aprobada, pendiente de final.
  - 🔵 **En Curso:** Cursando durante el cuatrimestre actual.
  - 🟣 **Condicional:** Cursando bajo régimen condicional.
  - 🔴 **Libre:** Pérdida de regularidad (alerta de correlativas bloqueadas).
  - ⚪ **Pendiente:** Materia por cursar.
- **Gestión de Notas y Analítico (⭐ Promedio en Tiempo Real):**
  - Tabla completa para ingresar calificaciones numéricas (1 a 10) y su origen (Examen, Promoción, etc.).
  - Al cargar una nota de aprobación (4 a 10), la materia se marca aprobada automáticamente.
  - Cálculo instantáneo de promedio general y porcentaje de carrera completado.
- **Estrategia & Próximas Mesas de Examen:**
  - Ranking de materias regulares según impacto de desbloqueo (te indica qué final te conviene rendir primero).
  - Seguimiento de materias condicionales y finales urgentes pendientes.
- **Optimización de Espacio:**
  - **Ocultar / Colapsar Años:** Botones para colapsar años completos en tiras delgadas de 56px (por ejemplo, podés ocultar los años que ya tengas 100% aprobados con el botón *"Ocultar aprobados"*).
  - **Cerrar Panel Lateral:** Botón `[ ✕ ]` o tecla `Esc` para ocultar los detalles y expandir el mapa al 100% del ancho de pantalla.
- **Control de Datos:**
  - **Limpiar Avance:** Botón para reiniciar todos los datos a cero en cualquier momento.
  - **Plantilla de Ejemplo:** Posibilidad de cargar un avance de prueba para explorar las funciones.
  - **Persistencia en LocalStorage:** Todos los datos se guardan en el navegador del usuario de manera privada.

---

## 🚀 Cómo Correr Localmente

1. Clonar el repositorio o abrir la carpeta del proyecto.
2. Instalar las dependencias:
   ```bash
   npm install
   ```
3. Iniciar el servidor de desarrollo local:
   ```bash
   npm run dev
   ```
4. Abrí en tu navegador la URL que indica la terminal (usualmente `http://localhost:5173`).

---

## 📦 Despliegue en GitHub Pages

El proyecto ya cuenta con el flujo automatizado de **GitHub Actions** (`.github/workflows/deploy.yml`) y rutas relativas (`base: './'`).

1. Subí tus cambios a tu repositorio de GitHub:
   ```bash
   git push -u origin main
   ```
2. En GitHub, andá a **Settings** > **Pages** y asegurate de que en **Build and deployment > Source** esté seleccionado:
   👉 **GitHub Actions**
3. ¡Listo! Tu página estará disponible públicamente en `https://TU_USUARIO.github.io/TU_REPOSITORIO/`.

---

## 🛠️ Tecnologías Utilizadas

- **React 18**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Lucide React**
