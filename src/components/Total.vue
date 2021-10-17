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

import RestaurantService from '@/services/RestaurantService'

export default {
    props: ['total'],
    methods: {
        ...mapActions(['setMsg', 'setLoading', 'submitCart']),
        async addToCart() {
            this.setLoading(true)

            try {
                let cart = this.getOrderByRestaurantId(this.$route.params.id)
                let resp = await RestaurantService.submitCart((cart))

                this.submitCart(cart)

                this.setMsg("Order Submited")
                setTimeout(() => { this.setMsg(null) }, 1500)
            } catch (err) {
                this.setMsg(err.response.data.message)
                setTimeout(() => { this.setMsg(null) }, 1500)
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