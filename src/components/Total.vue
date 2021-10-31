<template>
    <div class="sticky w-full flex justify-between items-center bg-gray-50 bottom-0">
        <span class="text-3xl ml-2">Total: ${{ total }}</span>
        <span class="text-3xl">
            <button class="p-4  text-gray-800" :class="{ 'bg-gray-400 cursor-not-allowed': total == 0, 'bg-green-300': total > 0 }" @click="addToCart" :disabled="total == 0" ><i class="fas fa-shopping-cart"/></button>
        </span>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import OrderService from '@/services/OrderService'

export default {
    props: ['total'],
    methods: {
        ...mapActions(['setMsg', 'setLoading', 'submitOrder']),
        async addToCart() {
            this.setLoading(true)

            try {
                let cart = this.getOrderByRestaurantId(this.$route.params.id)
                let resp = await OrderService.submitOrder((cart))

                this.submitOrder(resp.data)
                this.setMsg("Order Submited")
            } catch (err) {
                this.setMsg(err.response.data.message)
            }

            this.setLoading(false)
            this.$router.push({ name: 'Cart' })
        },
    },
    computed: {
        ...mapGetters(['getOrderByRestaurantId'])
    }
}
</script>