import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
        recommendGallery: JSON.parse(localStorage.getItem('recommendGallery')) || [],
        recommendArticle: JSON.parse(localStorage.getItem('recommendArticle')) || []
    },
    mutations: {
        setUser(state, payload) {
            state.userInfo = payload;
        },
        setRecommendGallery(state, payload) {
            state.recommendGallery = payload;
        },
        setRecommendArticle(state, payload) {
            state.recommendArticle = payload;
        }
    },
    actions: {}
})
