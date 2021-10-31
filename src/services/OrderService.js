import api from '@/services/Api'

export default {
    getOrders(phone) {
        return api.get(`api/order/phone/${phone}`)
    },
    submitOrder(cart) {
        return api.post('/api/order/save', cart);
    }
}