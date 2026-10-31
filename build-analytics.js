// Build script for bundling analytics.js
const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['analytics.js'],
  bundle: true,
  minify: true,
  outfile: 'analytics.bundle.js',
  format: 'iife',
  platform: 'browser',
}).then(() => {
  console.log('✓ Analytics bundle created successfully');
}).catch((error) => {
  console.error('Failed to bundle analytics:', error);
  process.exit(1);
});
