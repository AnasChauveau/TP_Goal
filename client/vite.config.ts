import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },

      manifest: {
        theme_color: "#f69435",
        background_color: "#f69435",
        display: "standalone",
        scope: "/",
        start_url: "/",
        name: "foot",
        short_name: "foot",
        icons: [
            {
                src: "public/icons/icon-144x144.png",
                sizes: "144x144",
                type: "image/png"
            },
            {
                src: "public/icons/icon-192x192.png",
                sizes: "192x192",
                type: "image/png"
            },
            {
                src: "public/icons/icon-256x256.png",
                sizes: "256x256",
                type: "image/png"
            },
            {
                src: "public/icons/icon-384x384.png",
                sizes: "384x384",
                type: "image/png"
            },
            {
                src: "public/icons/icon-512x512.png",
                sizes: "512x512",
                type: "image/png"
            }
        ]
    },
    // workbox: {
    //   runtimeCaching: [
    //     {
    //       urlPattern: 'http://localhost:3000/',
    //       handler: 'StaleWhileRevalidate',
    //       options: {
    //         cacheName: 'currentDate',
    //         expiration: {
    //           maxEntries: 10,
    //           maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
    //         },
    //         cacheableResponse: {
    //           statuses: [0, 200]
    //         }
    //       }
    //     }
    //   ]
    // }
    })
  ],
})