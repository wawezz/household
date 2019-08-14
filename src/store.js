import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userLoggedIn: false,
    username: 'admin',
    userlogin: 'admin'

  },
  mutations: {
    userSubmitSuccessful (state) {
      state.userLoggedIn = true }
    }
    ,
  actions: {

  }
})


