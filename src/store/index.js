import createPersistedState from "vuex-persistedstate";
import axios from "axios";

export const plugins = [
  createPersistedState(),
];

export const state = {
  user: null,
  testUser: {
    data: {
      id: 1,
      tokens: {
        access: "test",
        refresh: "test"
      }
    },
    username: "admin",
    password: "123456"
  },
  authFormData: {
    username: "",
    password: ""
  },
  homes: []
};

export const actions = {
  getHousesInfo () {
     axios
         .get('http://cors-anywhere.herokuapp.com/newsarmenia.am/mockData.php')
         .then(data => {
            console.log("data:", JSON.parse(data))
         })
         .catch(error => {console.log(error)})

  }
}


export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  CLEAR_USER(state) {
    state.user = null;
  },
  CLEAR_AUTH_FORM_DATA(state) {
    state.authFormData.username = "";
    state.authFormData.password = "";
  }
};