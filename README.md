# User Posts App

Aplicación hecha con **React + TypeScript + Vite + Material UI** que consume la API pública de [JSONPlaceholder](https://jsonplaceholder.typicode.com/).

## Requisitos

1. Listado de usuarios con búsqueda por nombre.
2. Al elegir un usuario, ver sus publicaciones y crear una nueva mediante un formulario validado (título y texto obligatorios). La API no persiste, así que la nueva publicación se agrega localmente a la lista.
3. Estados de carga y error visibles.
4. Al menos 3 tests con **Vitest + React Testing Library**.
5. README con instrucciones de ejecución, decisiones tomadas, próximos pasos y registro del uso de IA.

---

## Análisis y decisiones de arquitectura

### Stack elegido

| Pieza          | Elección                                 | Por qué                                                                                                    |
| -------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Build tool     | Vite                                     | Ya viene en la base del proyecto. Rápido, moderno, soporte TS nativo.                                      |
| Lenguaje       | TypeScript                               | Requisito del ejercicio. Da contratos explícitos y reduce errores en props/estado.                         |
| UI             | Material UI (MUI)                        | El usuario la instaló previamente. Ofrece componentes accesibles y estilados de entrada.                   |
| Router         | React Router DOM                         | Navegación por URL con parámetros (`/users/:userId/posts`).                                                |
| HTTP           | `fetch` nativo                           | JSONPlaceholder es simple; no justifica agregar axios u otra dependencia.                                  |
| Estado + caché | TanStack Query (`@tanstack/react-query`) | Maneja caché, loading, error y re-fetch de forma simple y robusta.                                         |
| Testing        | Jest + `@testing-library/react`          | Ya estaba instalado en el proyecto. Se configuró con Babel para transformar TypeScript.                    |
| Validación     | Estado local + helpers simples           | Evito dependencias extra (`react-hook-form`, zod) porque el formulario tiene solo dos campos obligatorios. |

### Estructura de carpetas

```
src/
  api/              # Cliente de API y funciones específicas por recurso
  api/__mocks__/    # Mocks de la API para tests
  components/       # Componentes de presentación reutilizables
  hooks/            # Custom hooks para datos y comportamiento reusable
  pages/            # Páginas vinculadas a rutas
  types/            # Modelos TypeScript (User, Post, etc.)
  App.tsx           # Definición de rutas
  main.tsx          # Bootstrap
```

### Flujo de datos

1. `App` carga la lista de usuarios desde `/users`.
2. El usuario filtra por nombre.
3. Al hacer clic en un usuario, `App` guarda el `userId` seleccionado.
4. Se cargan los posts de ese usuario desde `/posts?userId={id}`.
5. El formulario de nuevo post valida título y cuerpo, hace `POST /posts` y agrega el resultado a la lista local.

### Decisiones clave

- **React Router**: la navegación entre el listado de usuarios (`/`) y las publicaciones de un usuario (`/users/:userId/posts`) se hace por URL, pasando el `userId` por parámetro.
- **TanStack Query para estado y caché del servidor**: maneja usuarios, posts y la creación de posts con caché, estados de carga/error y actualización optimista de la lista.
- **Fetch nativo + hooks custom**: separo la lógica de API de la UI para que los componentes sean más fáciles de testear. Uso `fetch` directamente, sin axios.
- **Buscador con debounce**: el filtro de usuarios por nombre usa un custom hook `useDebounce` para no disparar búsquedas en cada tecla.
- **Material UI para todo**: buscador, lista, tarjetas, formulario, estados de carga/error y feedback.

### Plan de commits propuesto

1. `docs: add analysis and architecture decisions to README`
2. `chore: setup TypeScript, Jest and Testing Library`
3. `chore: add and configure TanStack Query with custom hooks`
4. `feat: add types and jsonplaceholder API client`
5. `feat: add user list with search and debounce`
6. `style: apply white background, black text, spanish copy and roboto font`
7. `feat: add react router, posts page and create post form`
8. `test: add unit tests for user list, posts and form`
9. `docs: finalize README with process and AI usage`

---

## Cómo ejecutar

```bash
npm install
npm run dev       # levanta el servidor de desarrollo
npm run test      # ejecuta los tests en modo watch
npm run test:run  # ejecuta los tests una sola vez (CI)
npm run typecheck # verifica tipos con TypeScript
npm run build     # build de producción
```

### Nota sobre la configuración de Jest

El proyecto ya tenía `jest@30` instalado. La primera opción considerada fue `ts-jest`, pero presentó dos problemas:

1. `ts-jest@29` no es compatible con `jest@30`.
2. npm instaló una versión falsa/inexistente de TypeScript (`typescript@7.0.2`) al resolver `typescript@*`.

Se resolvió usando **babel-jest** con los presets `@babel/preset-env`, `@babel/preset-react` y `@babel/preset-typescript`, que es la configuración más estable para Jest 30 + React + TypeScript. Los archivos de configuración son `jest.config.cjs` y `babel.config.cjs` (extensión `.cjs` porque el `package.json` tiene `"type": "module"`).

---

## Tests

La suite usa **Jest + React Testing Library**. Los tests están en archivos `.test.tsx` junto al código que prueban.

- `src/App.test.tsx`: verifica que la ruta por defecto muestra el listado de usuarios.
- `src/components/UserList.test.tsx`: filtrado por nombre con debounce y navegación al hacer clic en un usuario.
- `src/components/PostFormDialog.test.tsx`: validación de campos obligatorios y envío del formulario.
- `src/pages/PostListPage.test.tsx`: renderizado de publicaciones en cards y apertura del diálogo de nueva publicación.

Los requests a `jsonplaceholder.typicode.com` se mockean con archivos en `src/api/__mocks__/jsonPlaceholder.ts` para que los tests sean deterministas y no dependan de red.

## Uso de la IA en este proyecto

> En construcción. Se actualizará a medida que avancemos.

- **Qué le pedí**: analizar la base del proyecto, implementar la app paso a paso con commits, agregar tests y documentar decisiones.
- **Qué acepté**: el stack Vite + React + TypeScript + MUI + Vitest; la estructura de carpetas; la decisión de no agregar router ni estado global.
- **Qué corregí / ajusté**: las decisiones de diseño, los ajustes de estilos y además la estructura del proyecto orientado a servicios y con react-query para manejar estado y caché (para proyectos pequeños puede resultar overcoding pero en lo particular me gusta mucho usarlo).
