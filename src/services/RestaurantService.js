import api from '@/services/Api'

export default {
    getRestaurants(page) {
        return api.get('/restaurant/all')
    },
    // getImage(restaurantId) {
    //     return api.get(`/restaurant/image/${restaurantId}`)
    // }
}

