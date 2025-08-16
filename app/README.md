# MSX-IDE Desktop (Tauri + React)

Primer commit: armazón mínimo con Tauri + React + Zustand, layout tipo Unity con paneles dockeables vía `react-mosaic-component`, SceneView en Canvas 2D (placeholder con pan/zoom), y puente Tauri para FS.

## Requisitos
- Node.js 18+ (recomendado 20 LTS)
- Rust toolchain estable (`rustup default stable`)
- pnpm o npm (ejemplos con pnpm)

## Scripts
- `pnpm install`
- `pnpm tauri:dev` — ejecuta la app de escritorio en modo dev (Vite + Tauri)
- `pnpm build` — build de frontend (Vite)
- `pnpm tauri:build` — empaqueta app de escritorio

## Estructura
```
app/
  src/              # React renderer
  src-tauri/        # Backend Tauri (Rust)
```

## Estado inicial
- Scene (raíz) bloqueada en transform.
- Layout base: Hierarchy (izq), Scene (centro), Project+Inspector (der), Game (abajo).
- Atajos y menús: placeholders. Próximos commits añadirán comandos funcionales (Open/Save, Import ZIP SpriteFusion, Undo/Redo, DnD, virtualización, etc).