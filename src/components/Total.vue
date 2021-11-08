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
import TokenService from '@/services/TokenService'

export default {
    props: ['total'],
    methods: {
        ...mapActions(['setMsg', 'setLoading', 'updateOrder', 'submitOrder']),
        async addToCart() {
            if (this.isUserSignedIn) {
                this.setLoading(true)

                try {
                    let cart = this.getOrderByRestaurantId(this.$route.params.id)

                    if (cart.phone === undefined) {
                        cart.phone = TokenService.getPhone()
                    }

                    let resp = await OrderService.submitOrder((cart))
                    this.submitOrder(resp.data)
                    this.setMsg("Order Submited")
                } catch (err) {
                    this.setMsg(err.response.data.message)
                }

                this.setLoading(false)
                this.$router.push({ name: 'Cart' })
            } else {
                this.$router.push({ name: 'SignIn' })
                this.setMsg("You have to Sign In First!")
            }
        },
    },
    computed: {
        ...mapGetters(['getOrderByRestaurantId', 'isUserSignedIn'])
    }
}
</script>