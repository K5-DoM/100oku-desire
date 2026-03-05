import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Docker開発時は VITE_BASE=/ を設定、GitHub Pages では /100oku-desire/ がデフォルト
  base: process.env.VITE_BASE ?? '/100oku-desire/',
  server: {
    host: true, // Dockerコンテナ外からアクセス可能にする
    watch: {
      usePolling: true, // Dockerボリューム上でのファイル変更検知
    },
  },
})
