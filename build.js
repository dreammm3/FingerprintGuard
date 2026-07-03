const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const mode = process.argv[2] || 'development';

const distDir = path.join(__dirname, 'dist');

function clean() {
  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
    console.log('Cleaned dist/ directory.');
  }
}

function copyManifest() {
  const src = path.join(__dirname, 'extension', 'manifest.json');
  const dest = path.join(distDir, 'manifest.json');
  
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  
  fs.copyFileSync(src, dest);
  console.log('Copied manifest.json to dist/');
}

async function build() {
  clean();
  copyManifest();

  const isDev = mode === 'development';

  const entryPoints = [
    { in: 'extension/background/background.ts', out: 'background/background' },
    { in: 'extension/content/content.ts', out: 'content/content' },
    { in: 'extension/injected/injected.ts', out: 'injected/injected' }
  ];

  try {
    await esbuild.build({
      entryPoints: entryPoints.map(ep => ep.in),
      bundle: true,
      sourcemap: true,
      minify: !isDev,
      target: 'es2020',
      outdir: distDir,
      platform: 'browser',
      format: 'esm', // Background worker can be registered as type module
      logLevel: 'info',
    });
    console.log(`Build completed successfully in ${mode} mode.`);
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

if (mode === 'clean') {
  clean();
} else {
  build();
}
