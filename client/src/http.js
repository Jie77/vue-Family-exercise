import axios from 'axios'
import store from './store'

axios.interceptors.request.use(
    config => {
        //if (store.state.token){
            config.headers.Authorization = `${store.state.token}`
        //}
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

export default axios