// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_API_URL,
      appUrl: process.env.NUXT_PUBLIC_APP_URL,
      globalDomain: process.env.NUXT_GLOBAL_DOMAIN,
      social: {
        facebook: process.env.NUXT_PUBLIC_FACEBOOK,
        tiktok: process.env.NUXT_PUBLIC_TIKTOK,
        instagram: process.env.NUXT_PUBLIC_INSTAGRAM,
        whatsapp: process.env.NUXT_PUBLIC_WHATSAPP,
        email: process.env.NUXT_PUBLIC_EMAIL,
      },
    },
  },
  modules: [
    "nuxt-gtag",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "nuxt-countdown",
  ],
  gtag: {
    id: "G-TCDVY5XPL2",
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
        },
      ],
    },
  },
});