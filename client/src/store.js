import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userInfo: JSON.parse(localStorage.getItem('userInfo'))
    },
    mutations: {
        setUser(state, payload) {
            state.userInfo = payload;
        }
    },
    actions: {}
})
