# 🎓 Mapa Interactivo - Plan de Estudios
### Ingeniería en Computación (Plan 2018)

Una aplicación web moderna, interactiva y responsiva para visualizar el mapa curricular, entender el régimen de correlatividades y simular el progreso académico a lo largo de la carrera.

---

## ✨ Características Principales

- **Visualización Completa del Plan:** Todas las asignaturas organizadas por año (1° a 5°) y cuatrimestres (1°C, 2°C y Anuales), además de las materias optativas.
- **Trazado Dinámico de Correlativas:** Al seleccionar o pasar el cursor por encima de una materia, se dibujan conexiones visuales y se resaltan con colores:
  - 🟡 **Amarillo:** Materias que necesitás regularizar para cursar.
  - 🟢 **Verde:** Materias que necesitás aprobar para cursar.
  - 🔵 **Celeste:** Materias futuras que esta asignatura desbloquea.
- **Seguimiento de Progreso y Guardado Automático:**
  - Marcá el estado de cada materia: `Pendiente`, `Regularizada` o `Aprobada`.
  - Tu progreso se almacena automáticamente en el `localStorage` de tu navegador para que nunca lo pierdas.
  - Barra de progreso general con porcentaje de la carrera completado.
- **Acciones Rápidas:**
  - Botones de autocompletado rápido por año completo.
  - Reinicio seguro del progreso.
- **Buscador y Filtros:**
  - Búsqueda en tiempo real por nombre de asignatura o código (ej. `IC311`, `Álgebra`).
  - Filtros: *Todas*, *Puedo cursar*, *Puedo rendir*, *Aprobadas*, *Regularizadas*, *Pendientes*.
- **Reglas de Ciclo Integradas:** Contempla requisitos de ciclo (ej. requisitos de 4° y 5° año).
- **Diseño Moderno:** Tema oscuro optimizado con Tailwind CSS, compatible con pantallas móviles, tablets y monitores ultrawide.

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
4. Abrí en tu navegador la URL que te indica la terminal (usualmente `http://localhost:5173`).

---

## 📦 Cómo Subir a tu GitHub y Activar GitHub Pages

El proyecto ya viene configurado con un **flujo de GitHub Actions automático** (`.github/workflows/deploy.yml`) y rutas relativas (`base: './'`), lo que significa que se publica sin necesidad de configurar dominios adicionales.

### Paso 1: Crear el repositorio en GitHub
1. Entrá a [GitHub](https://github.com) y creá un nuevo repositorio (por ejemplo llamado `plan-de-estudios` o `ingenieria-computacion`).
2. Podés dejarlo público o privado (GitHub Pages en cuentas gratuitas requiere que el repositorio sea público para desplegar páginas web).

### Paso 2: Vincular y subir tu código
Abrí una terminal en la carpeta de este proyecto y ejecutá:

```bash
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git branch -M main
git push -u origin main
```

*(Reemplazá `TU_USUARIO` y `TU_REPOSITORIO` por los tuyos).*

### Paso 3: Activar GitHub Pages con GitHub Actions
1. En tu repositorio de GitHub, andá a **Settings** (Configuración) > **Pages** (en el menú lateral izquierdo).
2. En **Build and deployment** > **Source**, seleccioná:
   👉 **GitHub Actions**
3. ¡Listo! En la pestaña **Actions** verás cómo se compila y publica tu sitio web automáticamente. En un par de minutos tendrás tu enlace listo: `https://TU_USUARIO.github.io/TU_REPOSITORIO/`.

---

## 🛠️ Tecnologías Utilizadas

- **[React 18](https://react.dev/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Vite](https://vitejs.dev/)** (Empaquetado ultrarrápido)
- **[Tailwind CSS](https://tailwindcss.com/)** (Estilos y diseño responsivo)
- **[Lucide React](https://lucide.dev/)** (Iconos modernos)
