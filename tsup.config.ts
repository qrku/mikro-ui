import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: { index: 'src/components/primitives/index.ts' },
    format: ['esm', 'cjs'],
    dts: true,
    external: ['react', 'react-dom', 'react/jsx-runtime', 'next'],
    loader: { '.css': 'local-css' },
    tsconfig: 'tsconfig.lib.json',
    clean: true,
    treeshake: true,
  },
  {
    entry: { tokens: 'src/components/primitives/tokens.css' },
    outExtension: () => ({ js: '.js' }),
    loader: { '.css': 'copy' },
    clean: false,
  },
]);
