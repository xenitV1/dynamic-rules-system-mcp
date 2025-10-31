import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    cli: 'src/cli.ts',
  },
  format: ['cjs', 'esm'],
  target: 'node18',
  platform: 'node',
  bundle: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  external: ['@modelcontextprotocol/sdk'],
  treeshake: true,
});

