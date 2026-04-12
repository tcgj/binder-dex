# TCG Binderdex

A browser-based binder planning tool for trading card collections.

The app is focused on a tool-first editor flow:
- configure a binder layout with standard pocket presets or a custom grid
- move through binder pages with a floating toolbar
- inspect and assign cards into slots
- browse cards and preview them before placing or replacing them

## Current Scope

This project is currently a frontend prototype built with React, TypeScript, and Vite.

It includes:
- binder presets for `4-pocket`, `9-pocket`, `12-pocket`, `16-pocket`, and `custom`
- page-by-page binder navigation
- a responsive editor shell with left tools drawer and right inspector drawer
- contextual card browsing and slot replacement flows
- typed CSS Modules enforced in lint/build

## Stack

- React 19
- TypeScript
- Vite
- ESLint
- Prettier
- CSS Modules
- `typed-css-modules`

## Project Structure

Top-level editor structure:

```text
EditorPage
├─ EditorDrawer
│  ├─ BinderSetupPanel
│  └─ PageRail
├─ BinderPage
│  └─ BinderSlot × N
├─ EditorToolbar
└─ EditorInspector
   └─ RightPanel
      ├─ BrowseCardsView
      ├─ CardPreviewView
      └─ SelectedSlotView
```

State is currently split into:
- `useBinderState` for binder data and binder mutations
- `useEditorState` for editor shell state and selected slot
- `useToolbarState` for toolbar-specific UI state
- `useInspectorPanelState` for panel-local browse/preview flow

## Development

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

This starts:
- Vite
- CSS module type generation in watch mode

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm run format
npm run format:check
```

## CSS Module Types

This repo uses generated `*.module.css.d.ts` files for CSS module class safety.

They are treated as generated artifacts and are ignored by git. The relevant scripts are:
- `npm run css:types`
- `npm run css:types:watch`
- `npm run css:types:check`

## GitHub Pages

This repo is configured for GitHub Pages deployment at the repo subpath:

```text
/binder-dex/
```

The Vite `base` setting is already configured for that path, and the GitHub Actions workflow is in:

- [`.github/workflows/deploy-pages.yml`](./.github/workflows/deploy-pages.yml)

To publish:
1. Push to `main`
2. In GitHub repository settings, configure Pages to deploy from `GitHub Actions`

The expected Pages URL will be:

```text
https://<your-user>.github.io/binder-dex/
```

## Status

This is still an active refactor/prototype. The main focus right now is:
- improving reviewability of the editor architecture
- tightening layout and drawer behavior
- refining binder-page sizing and responsive behavior
- continuing the inspector/browser interaction cleanup
