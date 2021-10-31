import api from '@/services/Api'

export default {
    getRestaurants(page) {
        return api.get('/api/restaurant/all')
    },
    getImage(restaurantId) {
        return api.get(`/api/restaurant/image/${restaurantId}`)
    }
}

