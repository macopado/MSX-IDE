# MSX-IDE (Mock UI)

Maqueta inicial que copia el layout de Unity: Scene, Game, Hierarchy, Project e Inspector, con paneles acoplables, menú superior y controles de Play/Pause/Step.

## Requisitos
- Node 18+ (recomendado 20+)

## Instalar y ejecutar
```bash
npm install
npm run dev
# Abre http://localhost:5173
```

## Estructura
- `src/layout.json`: define el layout (arrastrable y persistido en `localStorage`).
- `src/components/*`: componentes de cada panel y barras.
- `src/styles/theme.css`: tema oscuro estilo Unity.

## Próximos pasos
- Guardar/restaurar layouts nombrados (Window > Layouts).
- Llevar a Electron/Tauri para app de escritorio.
- Conectar Project al sistema de ficheros real y a toolchain MSX.
- Inspector reactivo a la selección y árbol real en Hierarchy.