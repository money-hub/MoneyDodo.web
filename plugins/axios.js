export default function ({ $axios, redirect, store }) {
  $axios.onRequest((config) => {
    if (store.state.token) {
      config.headers.token = store.state.token
    }
    // config.headers.token = store.state.token
    return config
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      store.commit('removeToken')
      redirect('/')
    }
  })
}
