const pkg = require('./package')

module.exports = {
  mode: 'spa',

  server: {
    host: '0.0.0.0',
    post: 3000
  },
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/css/main.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    { src: '@/plugins/store', mode: 'client' },
    { src: '@/plugins/axios', mode: 'client' }
  ],

  router: {
    middleware: ['router']
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true,
    prefix: '/api',
    // baseURL: 'http://172.18.32.128:9090/api',
    credentials: true
  },

  proxy: [
    // ['/api/auth', {
    //   target: 'http://172.18.32.216:8123'
    // }],
    // ['/api/certs', {
    //   target: 'http://172.18.32.128:8123'
    // }],
    ['/api', {
      target: 'http://111.230.10.230:8998'
    }]
  ],
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    loaders: {
      vue: {
        compilerOptions: {
          preserveWhitespace: false
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
