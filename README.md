# Comunidad: prueba técnica

Prototipo de red social con React 19, TypeScript y Vite. Consume https://jsonplaceholder.typicode.com.

## Funcionalidades
- Listado de usuarios con buscador reactivo.
- Detalle de usuario: datos, álbumes con miniatura y TODOs.
- Galería de fotos por álbum.
- TODOs: añadir (sin números), editar, borrar y buscar.
- "Recién visitados": persiste entre sesiones con localStorage.

## Arranque
- `npm install` y `npm run dev`
- Tests: `npm run test:run`

## Decisiones
- JSONPlaceholder no persiste escrituras, así que los TODOs se modifican solo en estado local.
- Recién visitados usa localStorage (máximo 5, sin duplicados).
- Git Flow: `feature/*` → `develop` → `release/*` → `master`, con Conventional Commits.
- CI con GitHub Actions: lint, tests y build.

## Con más tiempo
React Router, Docker, TanStack Query, paginación de fotos, tests e2e y un hook `useAsync` genérico para quitar código repetido.

