import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: sessionStorage.getItem('token') || '',
        user: sessionStorage.getItem('user') || ''
    },
    mutations: {
        login: (state, data) => {
            state.token = data.token
            state.user = data.user
            sessionStorage.setItem('token',data.token)
            sessionStorage.setItem('user',data.user)
        }
    }
    
})

export default store