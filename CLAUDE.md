# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Start development server**: `pnpm start` - Runs the app at http://localhost:3000 with hot reload
- **Run tests**: `pnpm test` - Launches the test runner in interactive watch mode
- **Build for production**: `pnpm run build` - Creates optimized production build in the `build` folder
- **Run single test file**: `pnpm test -- --testNamePattern="Board"` or `pnpm test src/components/Board/Board.test.js`
- **Install dependencies**: `pnpm install` - Installs dependencies using pnpm (configured via corepack)

## Architecture

This is a React-based Minesweeper game built with Redux for state management and React Router for navigation.

### Tech Stack (Recently Upgraded)

- **React 18.3.1** with modern createRoot API
- **React Router 6.30.1** with Routes/Route element syntax
- **Redux 5.0.1** with React-Redux 9.2.0
- **React Scripts 5.0.1** (Create React App)
- **Sass 1.90.0** (replaced deprecated node-sass)
- **TypeScript 5.9.2**
- **ESLint 8.57.1** with @babel/eslint-parser
- **pnpm 10.14.0** with corepack

### Core Structure

- **Redux Store**: Centralized state management with 5 reducers:
  - `game`: Game state and loaded status
  - `tool`: Current selected tool (CLEAN, FLAG, TREASURE)
  - `modal`: Modal visibility and content
  - `styles`: Dynamic styling
  - `gameType`: Game mode (CLASSIC or PLAYER)

### Key Components

- **Game**: Main game container that accepts `gameId` param and optional `theme` query param
- **Board**: Renders the minesweeper grid, handles game logic
- **Controller**: Game controls and tools selection
- **Modal**: Reusable modal component for game interactions
- **Player**: Custom player/character system
- **Talk**: Communication/chat feature

### Game Data

- Game configurations stored in `/public/_games/` as JSON files
- Themes stored in `/public/_themes/` with CSS and image assets
- Each game can have custom tiled layouts and PNG images

### State Management

- Initial state defined in `src/configs.js`
- Actions organized by feature in `src/actions/`
- Uses traditional Redux pattern (not Redux Toolkit)

### Routing

- Home page at `/`
- Game page at `/game/:gameId` with optional `?theme=` parameter
- Uses React Router v6 with Routes/Route element syntax and BrowserRouter

### Styling

- SCSS modules for component-specific styles
- Modern Sass compiler (Dart Sass)
- Global styles in `src/index.scss`
- Theme-based styling support via CSS files in public themes directory

### Development Notes

- App successfully compiles with warnings (ESLint style preferences)
- All major dependencies upgraded to latest stable versions
- Build process works correctly for production deployment
