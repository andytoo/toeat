import axiosInstance from '@/services/Api'
import TokenService from '@/services/TokenService'
import AuthService from '@/services/AuthService'

import store from '@/store/index'

const setup = () => {
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = TokenService.getLocalAccessToken()
            if (token) {
                config.headers["Authorization"] = 'Bearer ' + token
            }
            return config
        },
        (err) => {
            return Promise.reject(err)
        }
    )

    axiosInstance.interceptors.response.use(
        (res) => {
            return res
        },
        async (err) => {
            const originalConfig = err.config
            if (originalConfig.url === "/user/refreshToken" && err.response) {
                // Refresh Token was expired
                if (err.response.status === 401 ) {
                    AuthService.signOut()
                } else {
                    return Promise.reject(err)
                }
            } else if (originalConfig.url !== "/user/signIn" && err.response) {
                // Access Token was expired
                if (err.response.status === 401) {
                    try {
                        if (!TokenService.getUser()) {
                            AuthService.signOut()
                        }

                        const response = await axiosInstance.post("/user/refreshToken", {
                            refreshToken: TokenService.getLocalRefreshToken(),
                        })
                        
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

                        return axiosInstance(originalConfig)
                    } catch (_err) {
                        return Promise.reject(_err)
                    }
                }
            }
            return Promise.reject(err)
        }
    )
}

export default setup