import api from '@/services/Api'
import store from '@/store/index'
import TokenService from '@/services/TokenService';

import router from '@/router/index'

class AuthService {
    signIn(user) {
        return api
        .post('/user/signIn', {
            phone: user.phone,
            password: user.password
        })
        .then(response => {
            if (response.data) {
                const user = { phone: response.data.phone, 
                               name: response.data.name, 
                               restaurantId: response.data.restaurantId, 
                               accessToken:  response.data.accessToken, 
                               refreshToken: response.data.refreshToken 
                             }
                store.dispatch('setUser', user)
                localStorage.setItem('user', JSON.stringify(user))
            }
            return response.data;
        })
        .catch(err => {
            return Promise.reject(err)
        });
    }

    signUp(user) {
        return api.post('/user/signUp', {
            phone: user.phone, 
            name: user.name, 
            password: user.password, 
            confirm: user.confirm
        })
        .then(response => {
            if (response.data) {
                const user = { phone: response.data.phone, 
                               name: response.data.name, 
                               restaurantId: response.data.restaurantId, 
                               accessToken:  response.data.accessToken, 
                               refreshToken: response.data.refreshToken 
                             }
                store.dispatch('setUser', user)
                localStorage.setItem('user', JSON.stringify(user))
            }
            return response.data;
        })
        .catch(err => {
            return Promise.reject(err)
        });
    }

    signOut() {
        TokenService.removeUser()
        store.dispatch('setUser', {})
        router.push('/signIn')
    }
}

export default new AuthService();