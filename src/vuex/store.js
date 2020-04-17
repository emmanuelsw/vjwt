import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
  },
  getters: {
    loggedIn(state) {
      return !!state.user
    }
  },
  mutations: {
    SET_USER_DATA(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
    }
  },
  actions: {
    register({ commit }, credentials) {
      return axios.post('http://localhost:3000/register', credentials)
        .then(({ data }) => {
          commit('SET_USER_DATA', data)
        })
    },
    login({ commit }, credentials) {
      return axios.post('http://localhost:3000/login', credentials)
        .then(({ data }) => {
          commit('SET_USER_DATA', data)
        })
    }
  }
})
