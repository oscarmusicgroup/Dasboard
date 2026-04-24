import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  nitro: {
    preset: 'cloudflare-pages'
  },
  app: {
    head: {
      title: 'Oscar Music Group | Dashboard Coming Soon',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-16' },
        { name: 'description', content: 'Hệ thống Dashboard dành riêng cho Nghệ sĩ của Oscar Music Group đang được phát triển.' }
      ]
    }
  }
})
