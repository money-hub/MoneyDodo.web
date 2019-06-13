import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      token: sessionStorage.getItem('token') || null,
      user: sessionStorage.getItem('username') || null
    }),
    mutations: {
      setToken(state, token) {
        sessionStorage.setItem('token', token)
        state.token = token
      },
      setUser(state, user) {
        sessionStorage.setItem('username', user)
        state.token = user
      },
      removeToken(state) {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('username')
        state.token = null
        state.user = null
      }
    },
    actions: {}
  })
}

export default createStore
