import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      token: sessionStorage.getItem('token') || null
    }),
    mutations: {
      setToken(state, token) {
        sessionStorage.setItem('token', token)
        state.token = token
      },
      removeToken(state) {
        sessionStorage.removeItem('token')
        state.token = null
      }
    },
    actions: {}
  })
}

export default createStore
