import Vue from 'vue'
import VueX, { Store } from 'vuex'

Vue.use(VueX)

export default new Store({
  state: {
    authUser: null,
    isAuthenticated: false,
    jwt: localStorage.getItem('vera.token'),
  },

  mutations: {
    setAuthUser (state, {
      authUser,
      isAuthenticated,
    }) {
      Vue.set(state, 'authUser', authUser)
      Vue.set(state, 'isAuthenticated', isAuthenticated)
    },
    updateToken (state, newToken) {
      state.jwt = newToken
      localStorage.setItem('vera.token', newToken)
    },
    removeToken (state) {
      state.jwt = null
      localStorage.removeItem('vera.token')
    },
  },
})
