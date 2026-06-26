# Rick & Morty App

Aplicación web desarrollada en **Angular 20** que consume la
[Rick and Morty API](https://rickandmortyapi.com/) para explorar personajes
de la serie, con listado paginado, búsqueda con filtros y una vista de detalle
enriquecida.

## Stack Tecnológico

- **Angular 20** — componentes standalone, signals, viewChild y control flow (`@if` / `@for`).
- **Tailwind CSS v4** — estilos utilitarios y diseño responsivo.
- **TypeScript** — modelos tipados para la respuesta de la API.
- **RxJS** — manejo de las peticiones HTTP.

## Funcionalidades

- Listado **paginado** de personajes con grid responsivo.
- **Búsqueda y filtros** por nombre, estado y especie.
- **Vista de detalle** con imagen, estado, especie, género, origen y ubicación.
- **Episodios**: las URLs de episodios se transforman en nombres reales
  mediante una petición múltiple a la API.
- **Lazy loading** de las vistas mediante `loadComponent`.
- Estados de **carga** y **error** manejados explícitamente.
- **Animaciones** vía hojas de estilo.
- Diseño **responsivo** (móvil, tablet y escritorio)

## Decisiones técnicas

- **Signals** para el estado de cada vista, aprovechando reactividad de Angular.
- **Component input binding** (`withComponentInputBinding`) para leer el parámetro
  de ruta `:id` como un `input.required`, en lugar de inyectar `ActivatedRoute`.
- Carga de episodios en **una sola petición** usando IDs separados por coma.

## Cómo ejecutarlo

```bash
npm install
ng serve -o
```

La app queda disponible en `http://localhost:4200`.

## Estructura del proyecto

```
src/app/
├── models/        # Interfaces tipadas (Character, Episode, etc.)
├── services/      # RickMortyService (peticiones a la API)
└── pages/
    ├── home/              # Página de bienvenida
    ├── character-list/    # Listado paginado + filtros
    └── character-detail/  # Detalle del personaje + episodios
```
## Para curiosos

Vale la pena ser curioso y clickear en varios puntos, uno nunca sabe 😜