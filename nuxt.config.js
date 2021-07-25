import colors from "vuetify/es5/util/colors";

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - musa-green-dashboard",
    title: "musa-green-dashboard",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/css/style.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: "~plugins/apexcharts.js" }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "@nuxtjs/apollo"
  ],

  apollo: {
    clientConfigs: {
      default: "~/plugins/graphql-config.js"
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/auth"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: false,
    browserBaseURL:
      "https://musa-integrator-v3-sandbox-production.up.railway.app/api",
    // browserBaseURL: 'https://7a312f874d9b.up.railway.app/api',
    headers: {
      common: {
        Accept: "application/json, text/plain, */*"
      }
    }
  },

  auth: {
    redirect: {
      logout: "/login"
      // callback: "/login"
    },
    strategies: {
      local: {
        token: {
          property: "access_token",
          type: "Bearer",
          maxAge: 1800,
          global: true,
          required: true,
          prefix: "_token.",
          expirationPrefix: "_token_expiration."
        },
        endpoints: {
          login: { url: "login", method: "post", propertyName: "access_token" },
          refresh: { url: "refresh", method: "get", propertyName: "access_token" },
          user: { url: "me", method: "get", propertyName: "email" }
          // logout : false,
        }
      }
    }
  },

  router: {
    middleware: ["auth"]
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  server: {
    port: 2500, // default: 3000
    host: "localhost" // default: localhost
  }
};
