import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  return {
    server: {
      allowedHosts: true,
      watch: {
        ignored: [
          '**/node_modules/.pnpm/**',
          '**/node_modules/.cache/**',
          '**/dist/**',
          '**/.git/**',
        ],
      },
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(
        mode === 'production' ? 'production' : 'development',
      ),
    },
    plugins: [
      viteTsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      tailwindcss(),
      tanstackStart(),
      viteReact(),
    ],
  }
})
