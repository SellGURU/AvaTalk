import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()
  ,VitePWA({
          registerType: 'autoUpdate',
          // devOptions: {
          //     enabled: true
          // },
          includeAssets: ['favicon.ico', "512_512.png","384_384.png","256_256.png","192_192.png","152_152.png",'48_48.png', '72_72.png', "96_96.png","128_128.png","144_144.png"],
          manifest: {
              start_url: "/",
              name: 'Avatalk',
              short_name: 'Avatalk',
              description: 'Avatalk',
              theme_color: '#ffffff',
              display: "standalone",
              icons: [
                  {
                      "src": "/iconspwa/lite/48_48.png",
                      "sizes": "48x48",
                      "type": "image/png"
                  },
                  {
                      "src": "/iconspwa/lite/72_72.png",
                      "sizes": "72x72",
                      "type": "image/png"
                  },
                  {
                      "src": "/iconspwa/lite/96_96.png",
                      "sizes": "96x96",
                      "type": "image/png"
                  },
                  {
                      "src": "/iconspwa/lite/128_128.png",
                      "sizes": "128x128",
                      "type": "image/png"
                  },
                  {
                      "src": "/iconspwa/lite/144_144.png",
                      "sizes": "144x144",
                      "type": "image/png"
                  },
                  {
                      "src": "/iconspwa/lite/152_152.png",
                      "sizes": "152x152",
                      "type": "image/png"
                  },
                  {
                      "src": "/iconspwa/lite/192_192.png",
                      "sizes": "192x192",
                      "type": "image/png"
                  },
                  {
                      "src": "/iconspwa/lite/256_256.png",
                      "sizes": "256x256",
                      "type": "image/png"
                  },
                  {
                      "src": "/iconspwa/lite/384_384.png",
                      "sizes": "384x384",
                      "type": "image/png"
                  },
                  {
                      "src": "/iconspwa/lite/512_512.png",
                      "sizes": "512x512",
                      "type": "image/png"
                  }
              ],
          },
          workbox: {
              maximumFileSizeToCacheInBytes: 3000000
          }
      })
  ],
})
