import Api from '@/services/Api'

export default {
    getRestaurants(page) {
        return Api().get('/api/restaurant/all')
    },
    getImage(restaurantId) {
        return Api().get(`/api/restaurant/image/${restaurantId}`)
    },
    submitCart(cart) {
        return Api().post('/api/order/save', cart);
    }
}

