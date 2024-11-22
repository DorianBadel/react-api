import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
        cleanupOutdatedCaches: true
      },
      manifest: {
        name: "React_api",
        short_name: "GHB",
        display: "standalone",
        scope: "/",
        start_url: "/",
        theme_color: "cyan",
        background_color: "white",
        icons: [
          {
            src: "/assets/pwa_logo.png",
            sizes: "144x144",
            type: "image/png"
          }
        ]
      }
    })
  ]
})