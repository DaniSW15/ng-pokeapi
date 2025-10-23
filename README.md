# NgPokeapi

Aplicación Angular que consume la [PokeAPI](https://pokeapi.co/) para mostrar información de Pokémon.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.2.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Arquitectura del Proyecto

### Estructura de Carpetas
```
src/app/
├── core/
│   ├── models/          # Interfaces y tipos
│   ├── services/        # Servicios HTTP
│   └── mappers/         # Transformación de datos
└── features/
    └── pokemon-list/
        ├── store/       # Estado (Store, Effects, State)
        └── pokemon-list.component.*
```

### Patrones Implementados

**Signals & Computed**
- Estado reactivo con Angular Signals
- Computed signals para propiedades derivadas

**Store Pattern**
- `PokemonListStore`: Manejo centralizado del estado
- `PokemonListEffects`: Lógica de efectos secundarios
- `PokemonListState`: Definición del estado

**Mappers**
- `PokemonMapper.mapListResponseToPokemons()`: Transforma lista básica a detalles completos
- `PokemonMapper.formatPokemonName()`: Formatea nombres (capitalización)

**RxJS Operators**
- `switchMap`: Cambia de observable (lista → detalles)
- `forkJoin`: Ejecuta peticiones HTTP en paralelo
- `map`: Transforma datos

### Flujo de Datos

1. **Componente** → llama a `effects.loadPokemons()`
2. **Effects** → ejecuta `service.getPokemons()`
3. **Service** → obtiene lista básica de PokeAPI
4. **Mapper** → transforma a peticiones paralelas de detalles
5. **Store** → actualiza estado con `addPokemons()`
6. **Componente** → renderiza con `store.pokemons()`

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
