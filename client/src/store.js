import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: '',
        user:''
    },
    mutations: {
        login: (state, data) => {
            state.token = data.token
            state.user = data.user
        }
    }
    
})

export default store