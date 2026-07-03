# FingerprintGuard

Research prototype for browser fingerprinting detection and defense.

## Project Structure

- `extension/` - Chrome Extension source files.
  - `background/` - Service worker to receive and process messages.
  - `content/` - Content script to inject scripts into webpage context.
  - `injected/` - Script injected directly into webpage context.
  - `shared/` - Shared typescript utilities and validator functions.
- `dist/` - Compiled output directory.

## Getting Started

### Installation

Install the build dependencies:

```bash
npm install
```

### Build Scripts

- Build for development (with sourcemaps):
  ```bash
  npm run dev
  ```
- Build for production (minified):
  ```bash
  npm run build
  ```
- Clean build outputs:
  ```bash
  npm run clean
  ```
- Typecheck TypeScript source files:
  ```bash
  npm run typecheck
  ```

### Loading into Chrome

1. Build the extension using `npm run build` or `npm run dev`.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the `dist/` directory generated in the root of the project.
